using System.ComponentModel.DataAnnotations;

namespace Florist.Entity
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Ad { get; set; }
        public string Soyad { get; set; }

        public string Email { get; set; }

        [Required]
        public string KullaniciAdi { get; set; }

        [Required]
        public string Sifre { get; set; }
    }
}