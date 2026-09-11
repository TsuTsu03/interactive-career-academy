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
  [string]$Model = "qwen/qwen3-vl-8b"
)

$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$runtimeDir = Join-Path $repo ".qwen-v2-campaign"
New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null
$watchdogLog = Join-Path $runtimeDir "watchdog.log"
$watchdogPidFile = Join-Path $runtimeDir "watchdog.pid"
$supervisorPidFile = Join-Path $runtimeDir "supervisor.pid"
$stopFile = Join-Path $repo "STOP_LOOP"
$restarts = New-Object System.Collections.ArrayList
$lastComplaint = ""

function Write-Watchdog([string]$Message) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
  Write-Host $line
  # Never hold this file open; a reader would lock the writer out.
  Add-Content -LiteralPath $watchdogLog -Value $line -Encoding utf8
}

function Test-SupervisorRunning {
  if (-not (Test-Path -LiteralPath $supervisorPidFile)) { return $false }
  $recorded = Get-Content -LiteralPath $supervisorPidFile -ErrorAction SilentlyContinue
  if (-not $recorded) { return $false }
  $process = Get-Process -Id ([int]$recorded) -ErrorAction SilentlyContinue
  return [bool]$process
}

if (Test-Path -LiteralPath $watchdogPidFile) {
  $previous = Get-Content -LiteralPath $watchdogPidFile -ErrorAction SilentlyContinue
  if ($previous -and (Get-Process -Id ([int]$previous) -ErrorAction SilentlyContinue)) { throw "Watchdog PID $previous is already running." }
}
$PID | Set-Content -LiteralPath $watchdogPidFile -Encoding ascii
Write-Watchdog "Watchdog started as PID $PID. Checking every $CheckSeconds seconds."

try {
  while ($true) {
    if (Test-Path -LiteralPath $stopFile) {
      Write-Watchdog "STOP_LOOP found. Watchdog stopping; the campaign will stop on its own."
      break
    }

    if (Test-SupervisorRunning) {
      $lastComplaint = ""
      Start-Sleep -Seconds $CheckSeconds
      continue
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
