
FROM microsoft/aspnetcore:1.0.4
LABEL Name=aspnetcore_fsharp_docker Version=0.0.1 
ARG source
WORKDIR /app
EXPOSE 80
COPY $source .
ENTRYPOINT dotnet WebApplicationBasic.dll
