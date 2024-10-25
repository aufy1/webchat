using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

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
