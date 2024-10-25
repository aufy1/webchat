# Etap podstawowy

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443 
USER root

# Etap budowy
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Skopiuj plik projektu i przywróć zależności
COPY ./api/*.csproj ./api/
RUN dotnet restore ./api/api.csproj

# Skopiuj resztę plików projektu i zbuduj aplikację
COPY ./api/ ./api/
WORKDIR /src/api
RUN dotnet build -c Release -o /app/build

# Publikowanie aplikacji
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Faza finalna
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "api.dll"]
