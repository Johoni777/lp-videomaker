# Just hero-reel + final-cta + main posters
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$ffmpeg = Join-Path $root "node_modules\ffmpeg-static\ffmpeg.exe"
$rootDesktop = "C:\Users\jvher\Desktop"
$outDir = Join-Path $root "public\videos"
$postersDir = Join-Path $outDir "posters"

$hScale = "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"

Write-Host "[*] hero-reel.mp4..." -ForegroundColor Cyan
$heroOut = Join-Path $outDir "hero-reel.mp4"
& $ffmpeg -y -hide_banner -loglevel error `
    -t 22 -i "$rootDesktop\saraiva.mp4" `
    -c:v libx264 -crf 25 -preset fast `
    -vf $hScale `
    -pix_fmt yuv420p -an -movflags +faststart `
    $heroOut
if ($LASTEXITCODE -ne 0) { throw "hero failed" }
& $ffmpeg -y -hide_banner -loglevel error `
    -ss "00:00:01" -i "$rootDesktop\saraiva.mp4" -frames:v 1 -q:v 3 `
    (Join-Path $postersDir "hero.jpg")
$mb = [math]::Round((Get-Item $heroOut).Length / 1MB, 2)
Write-Host "    -> $mb MB" -ForegroundColor Green

Write-Host "[*] final-cta.mp4..." -ForegroundColor Cyan
$finalOut = Join-Path $outDir "final-cta.mp4"
& $ffmpeg -y -hide_banner -loglevel error `
    -i "$rootDesktop\heringerdigital portugal.mp4" `
    -c:v libx264 -crf 26 -preset fast `
    -vf $hScale `
    -pix_fmt yuv420p -an -movflags +faststart `
    $finalOut
if ($LASTEXITCODE -ne 0) { throw "final-cta failed" }
& $ffmpeg -y -hide_banner -loglevel error `
    -ss "00:00:01" -i "$rootDesktop\heringerdigital portugal.mp4" -frames:v 1 -q:v 3 `
    (Join-Path $postersDir "final-cta.jpg")
$mb = [math]::Round((Get-Item $finalOut).Length / 1MB, 2)
Write-Host "    -> $mb MB" -ForegroundColor Green

# Generate og-image from hero poster (1200x630)
Write-Host "[*] og-image.jpg..." -ForegroundColor Cyan
& $ffmpeg -y -hide_banner -loglevel error `
    -i (Join-Path $postersDir "hero.jpg") `
    -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" `
    -q:v 3 (Join-Path $root "public\og-image.jpg")
Write-Host "    -> og-image.jpg" -ForegroundColor Green

$totalMb = [math]::Round(((Get-ChildItem -Path $outDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB), 2)
Write-Host ""
Write-Host "Total public/videos: $totalMb MB" -ForegroundColor Yellow
