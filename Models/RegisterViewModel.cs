using System.ComponentModel.DataAnnotations;

namespace Florist.Models
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "Ad gereklidir.")]
        public string Ad { get; set; }

        [Required(ErrorMessage = "Soyad gereklidir.")]
        public string Soyad { get; set; }

        [Required(ErrorMessage = "Email gereklidir.")]
        [EmailAddress(ErrorMessage = "Geçerli bir email adresi giriniz.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Kullanıcı adı gereklidir.")]
        public string KullaniciAdi { get; set; }

        [Required(ErrorMessage = "Şifre gereklidir.")]
        [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır.")]
        public string Sifre { get; set; }
    }
}
