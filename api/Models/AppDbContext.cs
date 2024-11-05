using Microsoft.EntityFrameworkCore;

namespace YourNamespace // Zastąp 'YourNamespace' odpowiednią przestrzenią nazw
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Dodaj DbSet dla tabel, z których chcesz korzystać
        public DbSet<User> Users { get; set; } = null!;
    }

    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
