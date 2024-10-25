using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Dodaj usługi kontrolerów
builder.Services.AddControllers();

// Dodaj CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Użyj CORS
app.UseCors("AllowAllOrigins");

// Usuwamy HTTPS Redirection, bo aplikacja działa tylko na HTTP za reverse proxy
// app.UseHttpsRedirection(); // To już nie jest potrzebne

// Mapowanie kontrolerów
app.MapControllers();

app.Run();
