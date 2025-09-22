using System.Collections.Generic;
using Florist.Entity;
using Microsoft.EntityFrameworkCore;

namespace Florist.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Urun> Uruns { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
