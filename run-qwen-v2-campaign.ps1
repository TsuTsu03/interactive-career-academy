<#
  ASCII ONLY. Resumable SQL/NoSQL authoring campaign for Windows PowerShell 5.1.
  Each child pass has exact rollback, static gates, and a human checkpoint.
  This supervisor never targets the five courses that lack a grading model.
#>
param(
  [ValidateRange(0, 190)][int]$MaxAcceptedBatches = 0,
  [ValidateRange(1, 8)][int]$AttemptsPerBatch = 4,
  [ValidateRange(1, 50)][int]$PushEvery = 10,
  [ValidateRange(0, 60)][int]$PauseSeconds = 5,
  [string]$Model = "qwen/qwen3-vl-8b"
)

$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$webDir = Join-Path $repo "apps\web"
$runtimeDir = Join-Path $repo ".qwen-v2-campaign"
$campaignLog = Join-Path $runtimeDir "campaign.log"
$stateFile = Join-Path $runtimeDir "state.json"
$stopFile = Join-Path $repo "STOP_LOOP"
$lms = Join-Path $env:USERPROFILE ".lmstudio\bin\lms.exe"
$accepted = 0
$sincePush = 0
$failed = $false
$serverStarted = $false
$modelLoaded = $false

function Write-Campaign([string]$Message) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
  Write-Host $line
  Add-Content -LiteralPath $campaignLog -Value $line -Encoding utf8
}

function Read-Progress {
  $json = & node --no-warnings (Join-Path $webDir "tools\qwen-v2-campaign.mjs") 2>&1
  if ($LASTEXITCODE -ne 0) { throw "Could not read campaign progress: $json" }
  return ($json | ConvertFrom-Json)
}

function Save-State($Progress, [string]$Status, [string]$Detail) {
  [ordered]@{
    updatedAt = (Get-Date).ToString("o")
    status = $Status
    detail = $Detail
    pid = $PID
    acceptedThisRun = $accepted
    sql = $Progress.sql
    nosql = $Progress.nosql
  } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $stateFile -Encoding utf8
}

function Push-Checkpoint {
  if ((& git -c "safe.directory=$repo" branch --show-current) -ne "codex/v2-backbone") { throw "Refusing to push outside codex/v2-backbone." }
  if ((& git -c "safe.directory=$repo" remote get-url origin) -ne "https://github.com/TsuTsu03/interactive-career-academy.git") { throw "Unexpected origin; refusing to push." }
  & git -c "safe.directory=$repo" push origin codex/v2-backbone
  if ($LASTEXITCODE -ne 0) { throw "Checkpoint push failed." }
  $script:sincePush = 0
  Write-Campaign "Pushed validated checkpoints to origin/codex/v2-backbone."
}

New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null
try {
  Push-Location $repo
  $pidFile = Join-Path $runtimeDir "supervisor.pid"
  if (Test-Path -LiteralPath $pidFile) {
    $previousPid = Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue
    if ($previousPid -and [int]$previousPid -ne $PID -and (Get-Process -Id ([int]$previousPid) -ErrorAction SilentlyContinue)) { throw "Another campaign supervisor is already running as PID $previousPid." }
  }
  $PID | Set-Content -LiteralPath $pidFile -Encoding ascii
  if ((& git -c "safe.directory=$repo" branch --show-current) -ne "codex/v2-backbone") { throw "Campaign requires codex/v2-backbone." }
  if (& git -c "safe.directory=$repo" status --porcelain --untracked-files=all) { throw "Campaign requires a clean working tree." }
  if (-not (Test-Path -LiteralPath $lms)) { throw "LM Studio CLI not found at $lms" }
  try { [void](Invoke-RestMethod -Uri "http://localhost:1234/v1/models" -TimeoutSec 3) } catch {
    & $lms server start | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Could not start the LM Studio server." }
    $serverStarted = $true
  }
  $loaded = @(& $lms ps --json | ConvertFrom-Json | ForEach-Object { $_.identifier })
  if ($loaded -notcontains $Model) {
    & $lms load $Model --context-length 16384 --ttl 1800 | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Could not load $Model." }
    $modelLoaded = $true
  }
  Write-Campaign "Campaign started with $Model. PID $PID."
  while ($true) {
    $progress = Read-Progress
    Save-State $progress "running" "Selecting the next bounded batch."
    if ($progress.complete) {
      if ($sincePush -gt 0) { Push-Checkpoint }
      Save-State $progress "complete" "SQL 750 and NoSQL 250 reached with green gates."
      Write-Campaign "Campaign complete: SQL 750 and NoSQL 250."
      break
    }
    if (Test-Path -LiteralPath $stopFile) {
      Save-State $progress "stopped" "STOP_LOOP was present."
      Write-Campaign "STOP_LOOP found. Stopped before another batch."
      break
    }
    if ($MaxAcceptedBatches -gt 0 -and $accepted -ge $MaxAcceptedBatches) {
      if ($sincePush -gt 0) { Push-Checkpoint }
      Save-State $progress "stability-check-complete" "Requested accepted-batch limit reached."
      Write-Campaign "Stopped after $accepted accepted batches for stability review."
      break
    }
    $job = $progress.next
    $briefFile = Join-Path $runtimeDir "current-brief.txt"
    $job.brief | Set-Content -LiteralPath $briefFile -Encoding utf8
    $jobAccepted = $false
    for ($campaignAttempt = 1; $campaignAttempt -le $AttemptsPerBatch; $campaignAttempt++) {
      Write-Campaign "Starting $($job.courseId)/$($job.projectId) batch $($job.batch), campaign attempt $campaignAttempt."
      & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $repo "run-qwen-v2-loop.ps1") -MaxIterations 1 -CommitEvery 1 -PauseSeconds 0 -Model $Model -CourseId $job.courseId -ProjectId $job.projectId -BatchSize 5 -BatchBriefFile $briefFile
      if ($LASTEXITCODE -eq 0) { $jobAccepted = $true; break }
      if (Test-Path -LiteralPath $stopFile) { break }
      Write-Campaign "Rejected $($job.courseId)/$($job.projectId) batch $($job.batch); exact rollback confirmed by child driver."
    }
    if (-not $jobAccepted) { throw "Batch failed $AttemptsPerBatch campaign attempts: $($job.courseId)/$($job.projectId) batch $($job.batch)." }
    $accepted++
    $sincePush++
    $progress = Read-Progress
    Save-State $progress "running" "Accepted $($job.courseId)/$($job.projectId) batch $($job.batch)."
    Write-Campaign "Accepted batch $accepted this run. SQL $($progress.sql.current)/750; NoSQL $($progress.nosql.current)/250."
    if ($sincePush -ge $PushEvery) { Push-Checkpoint }
    if ($PauseSeconds -gt 0) { Start-Sleep -Seconds $PauseSeconds }
  }
} catch {
  $failed = $true
  $progress = try { Read-Progress } catch { $null }
  if ($sincePush -gt 0) {
    try { Push-Checkpoint } catch { Write-Campaign "Validated local checkpoints could not be pushed: $($_.Exception.Message)" }
  }
  Save-State $progress "blocked" $_.Exception.Message
  Write-Campaign "BLOCKED: $($_.Exception.Message)"
} finally {
  Pop-Location
  if ($modelLoaded) { & $lms unload $Model 2>$null | Out-Null }
  if ($serverStarted) { & $lms server stop 2>$null | Out-Null }
  Write-Campaign "Campaign process ended."
}
if ($failed) { exit 1 }
