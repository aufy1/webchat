using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore; // Importuj Entity Framework Core
using YourNamespace; // Upewnij się, że ta przestrzeń nazw jest poprawna

var builder = WebApplication.CreateBuilder(args);

// Dodaj usługi kontrolerów
builder.Services.AddControllers();

// Dodaj pamięć podręczną i sesje
builder.Services.AddDistributedMemoryCache(); // Pamięć podręczna
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true; // Ustawienia cookie
    options.Cookie.IsEssential = true; // Umożliwia korzystanie z sesji w przypadku braku zgody użytkownika na cookies
});

// Dodaj CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin() // Pozwól na dowolne pochodzenie
                          .AllowAnyMethod() // Pozwól na dowolne metody (GET, POST, itp.)
                          .AllowAnyHeader()); // Pozwól na dowolne nagłówki
});

// Konfiguracja bazy danych
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


var app = builder.Build();

// Użyj CORS
app.UseCors("AllowAllOrigins");

// Użyj sesji
app.UseSession();

// Mapowanie kontrolerów
app.MapControllers();

// Użyj HTTPS Redirection, jeśli będzie potrzebne
// app.UseHttpsRedirection(); // Odkomentuj, jeśli korzystasz z HTTPS

app.Run();
