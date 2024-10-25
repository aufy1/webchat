using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Przykładowa lista użytkowników
        private static readonly Dictionary<string, string> Users = new Dictionary<string, string>
        {
            { "user1@example.com", "password123" },
            { "user2@example.com", "password456" }
        };

        // POST: api/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (Users.TryGetValue(loginRequest.Email, out var password) && password == loginRequest.Password)
            {
                return Ok(new { message = "Logged in successfully" });
            }
            return Unauthorized("Invalid email or password.");
        }
    }

    // Klasa pomocnicza do modelu danych logowania
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
