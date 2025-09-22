using System;
using Florist.Data;
using Florist.Entity;
using Florist.Models;
using Microsoft.AspNetCore.Mvc;

namespace Florist.Controllers
{
   

        public class AccountController : Controller
    {
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterViewModel model)
        {
            // Kullanıcı adı ve email kontrolü
            if (_context.Users.Any(u => u.Email == model.Email))
            {
                return Json(new { success = false, error = "Bu email adresi zaten kayıtlı." });
            }

            if (_context.Users.Any(u => u.KullaniciAdi == model.KullaniciAdi))
            {
                return Json(new { success = false, error = "Bu kullanıcı adı zaten alınmış." });
            }

            // Model geçerli mi kontrol et
            if (ModelState.IsValid)
            {

                var user = new User
                {
                    Ad = model.Ad,
                    Soyad = model.Soyad,
                    Email = model.Email,
                    KullaniciAdi = model.KullaniciAdi,
                    Sifre = model.Sifre
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            // ModelState hatalarını JSON olarak döndür
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return Json(new { success = false, error = "Kayıt işlemi sırasında bir hata oluştu.", details = errors });
        }



        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.Sifre == model.Sifre);

                if (user != null)
                {
                    HttpContext.Session.SetString("UserEmail", user.Email);
                    HttpContext.Session.SetString("UserName", user.Ad);

                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false });
                }
            }

            return Json(new { success = false });
        }



        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Tüm oturum verilerini sil
            return RedirectToAction("Login");
        }
    }
}
