# PowerShell script to remove unused styles from React Native files
param(
    [string]$FilePath = "src"
)

Write-Host "🚀 Starting unused style cleanup..." -ForegroundColor Green

function Remove-UnusedStyles {
    param([string]$file)

    Write-Host "📁 Processing: $file" -ForegroundColor Cyan

    try {
        # Run ESLint to get unused styles
        $eslintOutput = & npx eslint $file --format=json 2>$null

        if ($eslintOutput) {
            $eslintData = $eslintOutput | ConvertFrom-Json

            if ($eslintData -and $eslintData[0].messages) {
                $unusedStyles = $eslintData[0].messages |
                    Where-Object { $_.ruleId -eq "react-native/no-unused-styles" } |
                    ForEach-Object {
                        if ($_.message -match "Unused style detected: styles\.(\w+)") {
                            $matches[1]
                        }
                    } | Where-Object { $_ }

                if ($unusedStyles.Count -gt 0) {
                    Write-Host "🧹 Found $($unusedStyles.Count) unused styles:" -ForegroundColor Yellow
                    $unusedStyles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }

                    Write-Host "⚠️  Please manually remove these styles from $file" -ForegroundColor Yellow
                    Write-Host "💡 Or use 'Ctrl+Shift+P' → 'Tasks: Run Task' → 'Clean Current File Styles'" -ForegroundColor Blue
                } else {
                    Write-Host "✅ No unused styles found" -ForegroundColor Green
                }
            }
        }
    }
    catch {
        Write-Host "❌ Error processing $file : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Process files
if (Test-Path $FilePath -PathType Container) {
    Get-ChildItem -Path $FilePath -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
        Remove-UnusedStyles $_.FullName
    }
} elseif (Test-Path $FilePath -PathType Leaf) {
    Remove-UnusedStyles $FilePath
} else {
    Write-Host "❌ Path not found: $FilePath" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Style cleanup scan completed!" -ForegroundColor Green
