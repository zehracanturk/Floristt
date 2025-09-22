using System;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Configuration;

namespace LoginApp.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string email, string password)
        {
            if (AuthenticateUser(email, password))
            {
                Session["email"] = email; // Kullanıcı oturumunu başlat
                return RedirectToAction("Index", "Home"); // Başarılı giriş sonrası yönlendirme
            }
            else
            {
                ViewBag.Error = "Hatalı e-posta veya şifre!";
                return View();
            }
        }

        private bool AuthenticateUser(string email, string password)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["florist"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT COUNT(*) FROM Users WHERE email = @email AND password = @password";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@Password", password); // Şifrelerin hashlenmesi önerilir!

                int userCount = (int)cmd.ExecuteScalar();
                return userCount > 0;
            }
        }

        public ActionResult Logout()
        {
            Session.Clear(); // Oturumu kapat
            return RedirectToAction("Login");
        }
    }
}