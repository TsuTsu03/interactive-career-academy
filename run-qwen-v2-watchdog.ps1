<#
  ASCII ONLY. Keeps the database authoring campaign alive for as long as this
  machine is on.

  The campaign supervisor already skips a batch it cannot author and carries on,
  so it stops only for something outside its control: a machine that slept, an
  LM Studio server that went away, a git failure. This watchdog restarts it when
  that happens.

  It refuses to start the supervisor while the working tree is dirty, because
  the child driver requires a clean tree and would reject every attempt. It also
  honours STOP_LOOP: create that file to end both the campaign and this
  watchdog.
#>
param(
  [ValidateRange(15, 900)][int]$CheckSeconds = 60,
  [ValidateRange(1, 60)][int]$MaxRestartsPerHour = 12,
  [ValidateRange(5, 240)][int]$StallMinutes = 30,
  [string]$Model = "qwen/qwen3-vl-8b"
)

$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
. (Join-Path $PSScriptRoot "qwen-v2-process.ps1")
$runtimeDir = Join-Path $repo ".qwen-v2-campaign"
New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null
$watchdogLog = Join-Path $runtimeDir "watchdog.log"
$watchdogPidFile = Join-Path $runtimeDir "watchdog.pid"
$supervisorPidFile = Join-Path $runtimeDir "supervisor.pid"
$stopFile = Join-Path $repo "STOP_LOOP"
# Two files, because the redirected stdout can lag behind in its buffer while
# campaign.log, written with Add-Content, is always flushed.
$heartbeatFiles = @((Join-Path $runtimeDir "supervisor.out.log"), (Join-Path $runtimeDir "campaign.log"))
$restarts = New-Object System.Collections.ArrayList
$lastComplaint = ""

function Write-Watchdog([string]$Message) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
  Write-Host $line
  # Never hold this file open; a reader would lock the writer out.
  Add-Content -LiteralPath $watchdogLog -Value $line -Encoding utf8
}

function Get-SupervisorPid { Read-QwenPid $supervisorPidFile "run-qwen-v2-campaign.ps1" }

# A live process is not the same as a working one. The campaign once sat for
# eleven hours on a model request that never returned, so silence in the log is
# treated as death.
function Test-SupervisorStalled {
  $latest = $null
  foreach ($file in $heartbeatFiles) {
    if (-not (Test-Path -LiteralPath $file)) { continue }
    $written = (Get-Item -LiteralPath $file).LastWriteTime
    if (-not $latest -or $written -gt $latest) { $latest = $written }
  }
  if (-not $latest) { return $false }
  return (((Get-Date) - $latest).TotalMinutes -gt $StallMinutes)
}

$livePid = Read-QwenPid $watchdogPidFile "run-qwen-v2-watchdog.ps1"
if ($livePid) { throw "Watchdog PID $livePid is already running." }
$PID | Set-Content -LiteralPath $watchdogPidFile -Encoding ascii
Write-Watchdog "Watchdog started as PID $PID. Checking every $CheckSeconds seconds."

try {
  while ($true) {
    if (Test-Path -LiteralPath $stopFile) {
      Write-Watchdog "STOP_LOOP found. Watchdog stopping; the campaign will stop on its own."
      break
    }

    $supervisorPid = Get-SupervisorPid
    if ($supervisorPid) {
      if (-not (Test-SupervisorStalled)) {
        $lastComplaint = ""
        Start-Sleep -Seconds $CheckSeconds
        continue
      }
      Write-Watchdog "Campaign PID $supervisorPid wrote nothing for $StallMinutes minutes. Stopping it and its children."
      Stop-QwenTree $supervisorPid
      Start-Sleep -Seconds 5
    }

    # A dirty tree is the one condition a restart cannot fix, so say it once
    # rather than every minute.
    $dirty = & git -c "safe.directory=$repo" -C $repo status --porcelain --untracked-files=all
    if ($dirty) {
      if ($lastComplaint -ne "dirty") {
        Write-Watchdog "Working tree is not clean, so the campaign cannot start. Commit or stash the changes."
        $lastComplaint = "dirty"
      }
      Start-Sleep -Seconds $CheckSeconds
      continue
    }

    $cutoff = (Get-Date).AddHours(-1)
    $recent = @($restarts | Where-Object { $_ -gt $cutoff })
    $restarts.Clear()
    foreach ($stamp in $recent) { [void]$restarts.Add($stamp) }
    if ($restarts.Count -ge $MaxRestartsPerHour) {
      if ($lastComplaint -ne "flapping") {
        Write-Watchdog "Restarted $($restarts.Count) times in the last hour. Holding off; something needs a human."
        $lastComplaint = "flapping"
      }
      Start-Sleep -Seconds $CheckSeconds
      continue
    }

    try {
      & (Join-Path $repo "start-qwen-v2-campaign.ps1") -Model $Model | Out-Null
      [void]$restarts.Add((Get-Date))
      $lastComplaint = ""
      Write-Watchdog "Campaign was not running. Started it again."
    } catch {
      if ($lastComplaint -ne "start-failed") {
        Write-Watchdog "Could not start the campaign: $($_.Exception.Message)"
        $lastComplaint = "start-failed"
      }
    }
    Start-Sleep -Seconds $CheckSeconds
  }
} finally {
  Remove-Item -LiteralPath $watchdogPidFile -ErrorAction SilentlyContinue
  Write-Watchdog "Watchdog stopped."
}
