<# ASCII ONLY. Starts the campaign watchdog in the background. #>
param(
  [ValidateRange(15, 900)][int]$CheckSeconds = 60,
  [string]$Model = "qwen/qwen3-vl-8b"
)
$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
. (Join-Path $PSScriptRoot "qwen-v2-process.ps1")
$runtimeDir = Join-Path $repo ".qwen-v2-campaign"
New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null
$pidFile = Join-Path $runtimeDir "watchdog.pid"
$livePid = Read-QwenPid $pidFile "run-qwen-v2-watchdog.ps1"
if ($livePid) { throw "Watchdog PID $livePid is already running." }
$arguments = @(
  "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", (Join-Path $repo "run-qwen-v2-watchdog.ps1"),
  "-CheckSeconds", $CheckSeconds,
  "-Model", $Model
)
$process = Start-Process powershell.exe -ArgumentList $arguments -WorkingDirectory $repo -WindowStyle Hidden `
  -RedirectStandardOutput (Join-Path $runtimeDir "watchdog.out.log") `
  -RedirectStandardError (Join-Path $runtimeDir "watchdog.err.log") -PassThru
Write-Host "Started campaign watchdog PID $($process.Id). Log: $runtimeDir\watchdog.log"
Write-Host "To stop everything: create the file STOP_LOOP in the repo root."
