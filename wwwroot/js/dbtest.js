const sql = require("mssql");

const config = {
  server: "ZEHRA8\SQLEXPRESS02", // veya "(local)" ya da "."
  database: "florist",
  options: {
    encrypt: false, // SSL kullanmıyorsan false
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",
  },
};

async function getUsers() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM dbo.users");
    console.log("📌 Kullanıcılar:", result.recordset);
  } catch (err) {
    console.error("❌ SQL Sorgu Hatası:", err);
  } finally {
    sql.close();
  }
}

getUsers();