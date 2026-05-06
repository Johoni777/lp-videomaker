# Optimize portfolio videos using ffmpeg-static
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts\optimize-videos.ps1

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$ffmpeg = Join-Path $root "node_modules\ffmpeg-static\ffmpeg.exe"
if (-not (Test-Path $ffmpeg)) {
    throw "ffmpeg not found at $ffmpeg. Run: npm install --save-dev ffmpeg-static"
}

$rootDesktop = "C:\Users\jvher\Desktop"
$src = Get-ChildItem -LiteralPath $rootDesktop -Directory `
    | Where-Object { $_.Name -like "Portf*VideoMaker" } `
    | Select-Object -First 1 -ExpandProperty FullName

if (-not $src) {
    throw "Source folder 'Portf*VideoMaker' not found inside $rootDesktop"
}
Write-Host "[i] Source: $src" -ForegroundColor DarkGray
$outDir = Join-Path $root "public\videos"
$portfolioDir = Join-Path $outDir "portfolio"
$postersDir = Join-Path $outDir "posters"
$portfolioPostersDir = Join-Path $postersDir "portfolio"

New-Item -Force -ItemType Directory -Path $portfolioDir, $portfolioPostersDir, $postersDir | Out-Null

function Optimize-Clip {
    param(
        [string]$InputPath,
        [string]$OutputId,
        [int]$Crf = 26,
        [string]$MaxScale = "scale='min(720,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease",
        [switch]$NoAudio,
        [string]$OutDir = $portfolioDir,
        [string]$PosterDir = $portfolioPostersDir,
        [string]$Trim = $null
    )

    $outFile = Join-Path $OutDir "$OutputId.mp4"
    $posterFile = Join-Path $PosterDir "$OutputId.jpg"

    Write-Host "[*] Optimizing $OutputId from $(Split-Path $InputPath -Leaf)..." -ForegroundColor Cyan

    $audioArgs = if ($NoAudio) { @("-an") } else { @("-c:a", "aac", "-b:a", "128k") }
    $trimArgs = if ($Trim) { @("-t", $Trim) } else { @() }

    & $ffmpeg -y -hide_banner -loglevel error `
        -i $InputPath `
        @trimArgs `
        -c:v libx264 -crf $Crf -preset fast `
        -vf $MaxScale `
        -pix_fmt yuv420p `
        @audioArgs `
        -movflags +faststart `
        $outFile

    if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $OutputId" }

    & $ffmpeg -y -hide_banner -loglevel error `
        -ss "00:00:01" -i $InputPath -frames:v 1 -q:v 4 $posterFile

    $sizeMb = [math]::Round((Get-Item $outFile).Length / 1MB, 2)
    Write-Host "    -> $OutputId.mp4 ($sizeMb MB)" -ForegroundColor Green
}

# === Vertical clips (9:16) ===
# Chained scale ensures even dimensions (libx264 requires divisible by 2)
$vScale = "scale='min(720,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"

Optimize-Clip -InputPath "$src\FUJ Restaurante\IMG_7023.MP4"   -OutputId "fuj-1"           -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\FUJ Restaurante\IMG_7022.MP4"   -OutputId "fuj-2"           -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\Villa dei Nonni\IMG_7018.MP4"   -OutputId "villa-1"         -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\Villa dei Nonni\IMG_7020.MP4"   -OutputId "villa-2"         -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\Villa dei Nonni\IMG_7021.MP4"   -OutputId "villa-3"         -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\Urban Market\IMG_5780.MOV"      -OutputId "urban-market"    -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\Urban Market\IMG_5781.MOV"      -OutputId "urban-market-2"  -MaxScale $vScale -Crf 28
Optimize-Clip -InputPath "$src\NORIMAKI\IMG_1079 (1).MOV"      -OutputId "noriaki-1"       -MaxScale $vScale -Crf 30

# === Horizontal clips (16:9) ===
$hScale = "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"

Optimize-Clip -InputPath "$rootDesktop\saraiva.mp4"              -OutputId "saraiva"           -MaxScale $hScale -Crf 28
Optimize-Clip -InputPath "$rootDesktop\heringerdigital portugal.mp4" -OutputId "heringer-portugal" -MaxScale $hScale -Crf 28

# === Hero reel (no audio, 1280x720, trimmed to 22s) ===
Write-Host "[*] Building hero-reel.mp4..." -ForegroundColor Cyan
$heroOut = Join-Path $outDir "hero-reel.mp4"
& $ffmpeg -y -hide_banner -loglevel error `
    -t 22 -i "$rootDesktop\saraiva.mp4" `
    -c:v libx264 -crf 25 -preset fast `
    -vf $hScale `
    -pix_fmt yuv420p -an -movflags +faststart `
    $heroOut
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for hero-reel" }
& $ffmpeg -y -hide_banner -loglevel error `
    -ss "00:00:01" -i "$rootDesktop\saraiva.mp4" -frames:v 1 -q:v 3 `
    (Join-Path $postersDir "hero.jpg")
$mb = [math]::Round((Get-Item $heroOut).Length / 1MB, 2)
Write-Host "    -> hero-reel.mp4 ($mb MB)" -ForegroundColor Green

# === Final CTA reel (no audio, full ~11s) ===
Write-Host "[*] Building final-cta.mp4..." -ForegroundColor Cyan
$finalOut = Join-Path $outDir "final-cta.mp4"
& $ffmpeg -y -hide_banner -loglevel error `
    -i "$rootDesktop\heringerdigital portugal.mp4" `
    -c:v libx264 -crf 26 -preset fast `
    -vf $hScale `
    -pix_fmt yuv420p -an -movflags +faststart `
    $finalOut
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for final-cta" }
& $ffmpeg -y -hide_banner -loglevel error `
    -ss "00:00:01" -i "$rootDesktop\heringerdigital portugal.mp4" -frames:v 1 -q:v 3 `
    (Join-Path $postersDir "final-cta.jpg")
$mb = [math]::Round((Get-Item $finalOut).Length / 1MB, 2)
Write-Host "    -> final-cta.mp4 ($mb MB)" -ForegroundColor Green

# Total size summary
$totalMb = [math]::Round(((Get-ChildItem -Path $outDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB), 2)
Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Yellow
Write-Host "Total public/videos size: $totalMb MB" -ForegroundColor Yellow
