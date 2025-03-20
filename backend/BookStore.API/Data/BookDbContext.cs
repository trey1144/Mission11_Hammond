using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    // BookDbContext class
    public class BookDbContext : DbContext
    {
        // BookDbContext constructor
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        // DbSet for the Book class
        public DbSet<Book> Books { get; set; }
    }
}
