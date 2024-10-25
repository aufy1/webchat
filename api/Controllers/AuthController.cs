using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static readonly Dictionary<string, string> Users = new Dictionary<string, string>
        {
            { "user1@example.com", "password123" },
            { "user2@example.com", "password456" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (Users.TryGetValue(loginRequest.Email, out var password) && password == loginRequest.Password)
            {
                HttpContext.Session.SetString("UserEmail", loginRequest.Email);
                return Ok(new { message = "Logged in successfully" });
            }
            return Unauthorized("Invalid email or password.");
        }

        // Endpoint do sprawdzania sesji
        [HttpGet("check-session")]
        public IActionResult CheckSession()
        {
            // Sprawdź, czy użytkownik jest zalogowany
            if (HttpContext.Session.GetString("UserEmail") != null)
            {
                return Ok(); // Użytkownik jest zalogowany
            }

            return Unauthorized(); // Użytkownik nie jest zalogowany
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Logika wylogowania, np. usunięcie sesji
            HttpContext.Session.Clear();
            return Ok();
        }

    }

    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
