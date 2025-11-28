# Git commit and push script
# Usage: .\git-commit-push.ps1 "Your commit message"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "Staging all changes..." -ForegroundColor Yellow
git add .

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    $branch = git symbolic-ref --short HEAD
    git push origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "Failed to push. Please check your connection and authentication." -ForegroundColor Red
    }
} else {
    Write-Host "Commit failed. Please check your changes." -ForegroundColor Red
}

