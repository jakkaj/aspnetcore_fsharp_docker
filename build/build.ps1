dotnet build ../src
dotnet publish ../src
[Console]::OutputEncoding = [System.Text.Encoding]::Default
docker-compose -f "..\docker-compose.yml" build
