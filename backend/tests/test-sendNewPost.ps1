# Configuration
$Port = 8787
$Endpoint = "http://localhost:$Port/api/send-new-post"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " 1. Testing GET request (Health Check)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

try {
    $GetResponse = Invoke-RestMethod -Uri $Endpoint -Method Get
    Write-Host "GET Request Successful!" -ForegroundColor Green
    $GetResponse | ConvertTo-Json | Write-Host
}
catch {
    Write-Host "GET Request Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n===================================================" -ForegroundColor Cyan
Write-Host " 2. Testing POST request (Triggering Emails)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# Constructing the payload based on req.body expectations in handleSendNewPost
$Payload = @{
    title   = "Nuevo Post de Prueba desde PowerShell la segunda es la vencida"
    excerpt = "Este es un correo de prueba generado automáticamente usando un script de PowerShell. Es el segundo intento, la primera vez falló."
    slug    = @{
        current = "prueba-powershell"
    }
    tags    = @("Tecnología", "Test")
}

# Convert hashtable to JSON string
$JsonPayload = $Payload | ConvertTo-Json -Depth 5

Write-Host "Sending JSON Payload:`n$JsonPayload" -ForegroundColor DarkGray

try {
    $PostResponse = Invoke-RestMethod -Uri $Endpoint `
                                      -Method Post `
                                      -Body $JsonPayload `
                                      -ContentType "application/json"
    
    Write-Host "`nPOST Request Successful!" -ForegroundColor Green
    $PostResponse | ConvertTo-Json -Depth 5 | Write-Host
}
catch {
    Write-Host "`nPOST Request Failed!" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)" -ForegroundColor Red
    
    # Attempt to extract the specific JSON error response returned by Express
    if ($_.ErrorDetails) {
        Write-Host "Error Details: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
    } elseif ($_.Exception.Response) {
        $Stream = $_.Exception.Response.GetResponseStream()
        $Reader = New-Object System.IO.StreamReader($Stream)
        $ResponseBody = $Reader.ReadToEnd()
        Write-Host "Server Response Body: $ResponseBody" -ForegroundColor Yellow
    }
}