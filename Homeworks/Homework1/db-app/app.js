const { Pool } = require('pg');//pg modülünden Pool nesnesi alındı

async function fetchStudentInfo() {
  try {
    const pool = new Pool({ //PostgreSQL veritabanına bağlanmak için bir nsne oluşturldu
      user: 'user',//PostgreSQL veritabanına bağlanmak için gerekli olam bilgiler
      host: 'postgres',
      database: 'db',
      password: 'password',
      port: 5432,
    });
    const query = 'SELECT * FROM student';
    const result = await pool.query(query);
    console.log("Fetched student info from PostgreSQL:", result.rows);
  } catch (error) {
    console.error("Error fetching student info from PostgreSQL:", error);
  }
}

fetchStudentInfo();//PostgreSQL veritabanından öğrenci bilgileri çekiir




