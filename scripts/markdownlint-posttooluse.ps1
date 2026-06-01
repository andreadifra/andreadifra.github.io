# Lint Markdown files touched by agent edits and block follow-up turns until fixed.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-HookOutput {
    param(
        [Parameter(Mandatory)]
        [hashtable]$Payload
    )

    $Payload | ConvertTo-Json -Depth 10 -Compress | Write-Output
}

function Resolve-RepoPath {
    param(
        [Parameter(Mandatory)]
        [string]$BasePath,

        [Parameter(Mandatory)]
        [string]$PathValue
    )

    if ([string]::IsNullOrWhiteSpace($PathValue)) {
        return $null
    }

    if ([System.IO.Path]::IsPathRooted($PathValue)) {
        return [System.IO.Path]::GetFullPath($PathValue)
    }

    return [System.IO.Path]::GetFullPath((Join-Path -Path $BasePath -ChildPath $PathValue))
}

function Get-OptionalPropertyValue {
    param(
        [Parameter(Mandatory)]
        [object]$InputObject,

        [Parameter(Mandatory)]
        [string]$PropertyName
    )

    if ($null -eq $InputObject) {
        return $null
    }

    $property = $InputObject.PSObject.Properties[$PropertyName]

    if ($null -eq $property) {
        return $null
    }

    return $property.Value
}

function Get-PatchFilePaths {
    param(
        [string]$PatchText
    )

    if ([string]::IsNullOrWhiteSpace($PatchText)) {
        return @()
    }

    $matches = [regex]::Matches(
        $PatchText,
        '^\*\*\* (?:Add|Update) File: (.+?)(?: -> .+)?$',
        [System.Text.RegularExpressions.RegexOptions]::Multiline
    )

    return $matches | ForEach-Object { $_.Groups[1].Value.Trim() }
}

$rawInput = [Console]::In.ReadToEnd()

if ([string]::IsNullOrWhiteSpace($rawInput)) {
    Write-HookOutput @{ continue = $true }
    exit 0
}

try {
    $hookInput = $rawInput | ConvertFrom-Json -Depth 20
}
catch {
    Write-HookOutput @{ continue = $true; systemMessage = 'markdownlint hook skipped: invalid hook input.' }
    exit 0
}

$candidatePaths = [System.Collections.Generic.List[string]]::new()
$toolInput = Get-OptionalPropertyValue -InputObject $hookInput -PropertyName 'tool_input'
$toolName = Get-OptionalPropertyValue -InputObject $hookInput -PropertyName 'tool_name'
$repoRoot = Get-OptionalPropertyValue -InputObject $hookInput -PropertyName 'cwd'

if ([string]::IsNullOrWhiteSpace($repoRoot)) {
    $repoRoot = (Get-Location).Path
}

$repoRoot = [System.IO.Path]::GetFullPath($repoRoot)

if (-not [string]::IsNullOrWhiteSpace($env:TOOL_INPUT_FILE_PATH)) {
    $candidatePaths.Add($env:TOOL_INPUT_FILE_PATH)
}

if ($null -ne $toolInput) {
    $toolInputFilePath = Get-OptionalPropertyValue -InputObject $toolInput -PropertyName 'filePath'
    $toolInputFiles = Get-OptionalPropertyValue -InputObject $toolInput -PropertyName 'files'
    $toolInputPatch = Get-OptionalPropertyValue -InputObject $toolInput -PropertyName 'input'

    if ($null -ne $toolInputFilePath) {
        $candidatePaths.Add([string]$toolInputFilePath)
    }

    if ($null -ne $toolInputFiles) {
        foreach ($pathValue in $toolInputFiles) {
            $candidatePaths.Add([string]$pathValue)
        }
    }

    if ($toolName -eq 'apply_patch' -and $null -ne $toolInputPatch) {
        foreach ($pathValue in (Get-PatchFilePaths -PatchText ([string]$toolInputPatch))) {
            $candidatePaths.Add($pathValue)
        }
    }
}

$markdownExtensions = @('.md', '.markdown')
$excludedSegments = @('\_site\', '\_freeze\', '\.quarto\', '\node_modules\')

$filesToLint = $candidatePaths |
    ForEach-Object { Resolve-RepoPath -BasePath $repoRoot -PathValue $_ } |
    Where-Object { $null -ne $_ -and (Test-Path -LiteralPath $_) } |
    Where-Object { $markdownExtensions -contains ([System.IO.Path]::GetExtension($_).ToLowerInvariant()) } |
    Where-Object {
        $fullPath = $_
        -not ($excludedSegments | Where-Object { $fullPath -like "*$_*" })
    } |
    Sort-Object -Unique

if (-not $filesToLint) {
    Write-HookOutput @{ continue = $true }
    exit 0
}

$lintTargets = $filesToLint | ForEach-Object {
    [System.IO.Path]::GetRelativePath($repoRoot, $_).Replace('\', '/')
}

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-HookOutput @{
        decision = 'block'
        reason = 'markdownlint hook could not run because npx is unavailable.'
        hookSpecificOutput = @{
            hookEventName = 'PostToolUse'
            additionalContext = 'Install Node.js so the markdownlint hook can run markdownlint-cli after Markdown edits.'
        }
        systemMessage = 'markdownlint hook skipped: npx not found.'
    }
    exit 0
}

Push-Location $repoRoot

try {
    if ($IsWindows) {
        $quotedTargets = $lintTargets | ForEach-Object { '"' + $_.Replace('"', '\"') + '"' }
        $lintCommand = 'npx --yes markdownlint-cli ' + ($quotedTargets -join ' ')
        $lintOutput = & cmd /d /s /c $lintCommand 2>&1 | ForEach-Object { "$($_)" }
    }
    else {
        $lintOutput = & npx --yes markdownlint-cli -- @lintTargets 2>&1 | ForEach-Object { "$($_)" }
    }

    $lintExitCode = $LASTEXITCODE
}
finally {
    Pop-Location
}

if ($lintExitCode -eq 0) {
    Write-HookOutput @{ continue = $true }
    exit 0
}

$lintMessage = ($lintOutput -join [Environment]::NewLine).Trim()

if ($lintMessage.Length -gt 3000) {
    $lintMessage = $lintMessage.Substring(0, 3000) + [Environment]::NewLine + '...[truncated]'
}

$lintedFiles = ($filesToLint | ForEach-Object { Split-Path -Leaf $_ }) -join ', '

Write-HookOutput @{
    decision = 'block'
    reason = "markdownlint failed for $lintedFiles."
    hookSpecificOutput = @{
        hookEventName = 'PostToolUse'
        additionalContext = "Fix these markdownlint violations before continuing:`n$lintMessage"
    }
    systemMessage = "markdownlint failed for $lintedFiles."
}
exit 0