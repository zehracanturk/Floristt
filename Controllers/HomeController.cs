using System.Diagnostics;

using Florist.Models;

using Florist.Data; // DbContext buradan geliyor

using Florist.Entity; // Urun modeli için

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Logging;

namespace Florist.Controllers

{

    public class HomeController : Controller

    {

        private readonly ILogger<HomeController> _logger;

        private readonly AppDbContext _context;

        // DbContext'i de constructor'a ekle

        public HomeController(ILogger<HomeController> logger, AppDbContext context)

        {

            _logger = logger;

            _context = context;

        }


        public IActionResult Checkout()

        {

            return View();

        }
        public IActionResult Cart()

        {

            return View();

        }

        public IActionResult Login()

        {

            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "logIn.html"), "text/html");

        }
        public IActionResult Index()

        {

            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/html");

        }

        public IActionResult Hakkimizda()

        {

            return View();

        }

        public IActionResult  Occasion()

        {

            return View();

        }

        // Tek Urunler action'ı burada, veritabanından ürünleri çekiyor

        public IActionResult Urunler()

        {

            var urunler = _context.Uruns.ToList(); // Veritabanından ürünleri çek

            return View(urunler); // View'e gönder

        }

        public IActionResult Privacy()

        {

            return View();

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]

        public IActionResult Error()

        {

            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });

        }

    }

}

