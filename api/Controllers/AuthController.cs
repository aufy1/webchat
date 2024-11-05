using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // Logowanie użytkownika
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            // Wyszukaj użytkownika na podstawie adresu email
            var user = await _context.Users
                .AsNoTracking()  // Nie chcemy śledzić tej encji w celu wydajności
                .SingleOrDefaultAsync(u => u.Email == loginRequest.Email);

            // Sprawdź, czy użytkownik istnieje i hasło jest poprawne
            if (user != null && user.Password == loginRequest.Password)
            {
                // Przechowywanie adresu e-mail w sesji jako dowód zalogowania
                HttpContext.Session.SetString("UserEmail", loginRequest.Email);
                return Ok(new { message = "Logged in successfully" });
            }

            return Unauthorized("Invalid email or password.");
        }

        // Testowanie połączenia z bazą danych
        [HttpGet("test-database-connection")]
        public async Task<IActionResult> TestDatabaseConnection()
        {
            try
            {
                // Próbujemy połączyć się z bazą danych
                var canConnect = await _context.Database.CanConnectAsync();

                if (canConnect)
                {
                    Console.WriteLine("Database connection successful.");
                    return Ok("Database connection successful.");
                }
                else
                {
                    Console.WriteLine("Database connection failed.");
                    return StatusCode(500, "Database connection failed.");
                }
            }
            catch (Exception ex)
            {
                // Logowanie błędów w konsoli
                Console.WriteLine($"Database connection error: {ex.Message}");
                return StatusCode(500, $"Database connection error: {ex.Message}");
            }
        }

        // Sprawdzanie statusu sesji użytkownika
        [HttpGet("check-session")]
        public IActionResult CheckSession()
        {
            // Sprawdza, czy użytkownik jest zalogowany
            if (HttpContext.Session.GetString("UserEmail") != null)
            {
                return Ok(); // Użytkownik jest zalogowany
            }

            return Unauthorized(); // Użytkownik nie jest zalogowany
        }

        // Wylogowanie użytkownika
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Usunięcie sesji użytkownika (wylogowanie)
            HttpContext.Session.Clear();
            return Ok(new { message = "Logged out successfully" });
        }

        //[HttpGet("users")]
        //public async Task<IActionResult> GetUsers()
        //{
        //   var users = await _context.Users.ToListAsync();
        //    return Ok(users); // Zwrócenie listy użytkowników
        //}


    }

    // Model dla żądania logowania
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
