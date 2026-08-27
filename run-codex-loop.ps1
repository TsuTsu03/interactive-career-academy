<#
  run-codex-loop.ps1 — external driver for the CodeDaddy autonomous build loop.

  WHY THIS EXISTS

  A turn ends when the model stops emitting tool calls. That is a property of
  the runtime, not a choice the model makes, and no prompt wording overrides
  it. Codex ending its turn with "NEXT: ..." is it obeying the prompt, not
  ignoring it.

  So the loop lives out here. This script re-invokes Codex over and over,
  resuming the same session each time, until you stop it or the credits run
  out. Nobody types "run the prompt again".

  USAGE

    powershell -ExecutionPolicy Bypass -File .\run-codex-loop.ps1

  STOP IT

    New-Item -ItemType File STOP_LOOP     (finishes the current pass, then ends)
    or Ctrl+C                             (kills it now)

  Logs land in .codex-loop-logs\. The last message of each pass — the NEXT:
  line — is kept in .codex-loop-logs\last-message.txt.
#>

param(
  [int]$MaxIterations = 500,
  [int]$PauseSeconds  = 5,

  # workspace-write lets Codex edit this repo and run commands without
  # touching the rest of the disk. danger-full-access removes that boundary;
  # only pass it if you know why you want it.
  [ValidateSet("read-only", "workspace-write", "danger-full-access")]
  [string]$Sandbox = "workspace-write"
)

$ErrorActionPreference = "Continue"

$repo       = $PSScriptRoot
$promptFile = Join-Path $repo "CODEX_LOOP_PROMPT.md"
$stopFile   = Join-Path $repo "STOP_LOOP"
$logDir     = Join-Path $repo ".codex-loop-logs"
$lastMsg    = Join-Path $logDir "last-message.txt"

if (-not (Test-Path $promptFile)) { Write-Error "Missing $promptFile"; exit 1 }
if (-not (Test-Path $logDir))     { New-Item -ItemType Directory -Path $logDir | Out-Null }
if (Test-Path $stopFile)          { Remove-Item $stopFile -Force; Write-Host "Cleared stale STOP_LOOP." }

Set-Location $repo

# `codex exec resume` does not accept -s/--sandbox, so both invocations set the
# policy through -c instead. Approvals are forced off: an interactive prompt in
# an unattended loop is a hang, not a safeguard.
$common = @(
  "-c", "sandbox_mode=`"$Sandbox`"",
  "-c", "approval_policy=`"never`""
)

$continueMsg = @'
Continue the loop from section 2 of CODEX_LOOP_PROMPT.md.

Do not summarize the last pass. Do not ask whether to proceed. Re-read PLAN.md
section 8, pick up from your own NEXT: line, and execute the next batch with the
static gates green.

Browser QA stays deferred per section 5a. A large PENDING_QA.md is expected and
never pauses authoring. If the browser is unreachable, log one line and author
anyway. If nothing seems actionable, walk the ladder in section 5b.
'@

Write-Host ""
Write-Host "CodeDaddy autonomous build loop" -ForegroundColor Cyan
Write-Host "Repo:       $repo"
Write-Host "Sandbox:    $Sandbox"
Write-Host "Max passes: $MaxIterations"
Write-Host "Stop with:  New-Item -ItemType File STOP_LOOP"
Write-Host ""

$consecutiveFailures = 0

for ($i = 1; $i -le $MaxIterations; $i++) {

  if (Test-Path $stopFile) {
    Write-Host "STOP_LOOP found. Ending after $($i - 1) passes." -ForegroundColor Yellow
    break
  }

  $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
  $log   = Join-Path $logDir ("pass-{0:d3}-{1}.log" -f $i, $stamp)

  Write-Host "--- pass $i of $MaxIterations  ($stamp) ---" -ForegroundColor Green

  if ($i -eq 1) {
    Get-Content $promptFile -Raw |
      codex exec @common --output-last-message $lastMsg - 2>&1 |
      Tee-Object -FilePath $log
  } else {
    codex exec resume --last @common --output-last-message $lastMsg $continueMsg 2>&1 |
      Tee-Object -FilePath $log
  }

  $code = $LASTEXITCODE

  if ($code -ne 0) {
    $consecutiveFailures++
    Write-Host "codex exited $code (failure $consecutiveFailures in a row)." -ForegroundColor Yellow

    # Three failures in a row is not a transient hiccup — usually the credit
    # limit, an expired login, or a config error. Backing off forever just
    # burns the night, so stop and leave the logs.
    if ($consecutiveFailures -ge 3) {
      Write-Host "Three consecutive failures. Stopping. See $log" -ForegroundColor Red
      break
    }
    Start-Sleep -Seconds 30
    continue
  }

  $consecutiveFailures = 0

  if (Test-Path $lastMsg) {
    $next = (Get-Content $lastMsg -Raw) -split "`n" |
            Where-Object { $_ -match '^\s*NEXT:' } |
            Select-Object -Last 1
    if ($next) { Write-Host ("  " + $next.Trim()) -ForegroundColor DarkCyan }
  }

  $steps = (Select-String -Path "apps\web\content\*-course.ts" -Pattern '^\s*id:\s*"' -AllMatches |
            Measure-Object).Count
  Write-Host "  pass $i done. step-id lines across courses: $steps" -ForegroundColor DarkGray

  if (Test-Path $stopFile) {
    Write-Host "STOP_LOOP found. Ending after $i passes." -ForegroundColor Yellow
    break
  }

  Start-Sleep -Seconds $PauseSeconds
}

Write-Host ""
Write-Host "Loop finished. Logs in $logDir" -ForegroundColor Cyan
