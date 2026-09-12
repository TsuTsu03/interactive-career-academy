<#
  ASCII ONLY. Shared process helpers for the authoring campaign.

  A bare PID is not proof of life. Windows reuses process ids, and after the
  machine slept the campaign's id came back as an unrelated node process, so
  every liveness check said "running" for eleven hours while nothing ran.
  Identity here means the id AND the script it was started with.

  Dot-source this file; it defines functions and does nothing on its own.
#>

# True only when that id is a PowerShell process whose command line still names
# the given script.
function Test-QwenProcess([int]$ProcessId, [string]$ScriptName) {
  if ($ProcessId -le 0) { return $false }
  $process = Get-CimInstance Win32_Process -Filter "ProcessId=$ProcessId" -ErrorAction SilentlyContinue
  if (-not $process) { return $false }
  if ($process.Name -notmatch '^(powershell|pwsh)\.exe$') { return $false }
  return ($process.CommandLine -and $process.CommandLine -like "*$ScriptName*")
}

function Read-QwenPid([string]$Path, [string]$ScriptName) {
  if (-not (Test-Path -LiteralPath $Path)) { return 0 }
  $recorded = (Get-Content -LiteralPath $Path -ErrorAction SilentlyContinue | Select-Object -First 1)
  if (-not $recorded) { return 0 }
  $parsed = 0
  if (-not [int]::TryParse($recorded.Trim(), [ref]$parsed)) { return 0 }
  if (Test-QwenProcess $parsed $ScriptName) { return $parsed }
  return 0
}

# Children first, so a killed parent cannot orphan a running model request.
function Stop-QwenTree([int]$ProcessId) {
  if ($ProcessId -le 0) { return }
  foreach ($child in @(Get-CimInstance Win32_Process -Filter "ParentProcessId=$ProcessId" -ErrorAction SilentlyContinue)) {
    Stop-QwenTree ([int]$child.ProcessId)
  }
  Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
}
