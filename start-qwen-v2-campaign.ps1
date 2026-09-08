<# ASCII ONLY. Starts the resumable database authoring campaign in the background. #>
param(
  [ValidateRange(0, 190)][int]$MaxAcceptedBatches = 0,
  [ValidateRange(1, 8)][int]$AttemptsPerBatch = 4,
  [ValidateRange(1, 50)][int]$PushEvery = 10,
  [string]$Model = "qwen/qwen3-vl-8b"
)
$ErrorActionPreference = "Stop"
$repo = $PSScriptRoot
$runtimeDir = Join-Path $repo ".qwen-v2-campaign"
New-Item -ItemType Directory -Path $runtimeDir -Force | Out-Null
$pidFile = Join-Path $runtimeDir "supervisor.pid"
if (Test-Path -LiteralPath $pidFile) {
  $previousPid = Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue
  if ($previousPid -and (Get-Process -Id ([int]$previousPid) -ErrorAction SilentlyContinue)) { throw "Campaign supervisor PID $previousPid is already running." }
}
$out = Join-Path $runtimeDir "supervisor.out.log"
$err = Join-Path $runtimeDir "supervisor.err.log"
$arguments = @(
  "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", (Join-Path $repo "run-qwen-v2-campaign.ps1"),
  "-MaxAcceptedBatches", $MaxAcceptedBatches,
  "-AttemptsPerBatch", $AttemptsPerBatch,
  "-PushEvery", $PushEvery,
  "-Model", $Model
)
$process = Start-Process powershell.exe -ArgumentList $arguments -WorkingDirectory $repo -WindowStyle Hidden -RedirectStandardOutput $out -RedirectStandardError $err -PassThru
$process.Id | Set-Content -LiteralPath $pidFile -Encoding ascii
Write-Host "Started Qwen v2 campaign PID $($process.Id). State: $runtimeDir\state.json"
