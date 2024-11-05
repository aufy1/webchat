namespace YourNamespace.Models // Upewnij się, że używasz poprawnej przestrzeni nazw
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
