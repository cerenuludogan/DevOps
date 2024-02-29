"use strict";
const express = require("express");
const dbConnection = require("./helper/mysql");

const app = express();

/* //check db connection
dbConnection.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection error: ", err);
  } else {
    console.log("Database connected");
  }
});

 dbConnection.query("INSERT INTO students (name, midterm_grade, final_grade) VALUES ('Merve', 90, 40)", (err, results, fields) => {
  if (err) {
      console.log("Database query error: ", err);
  } else {
      console.log("Data inserted successfully");
  }
}); */

app.get('/', function(req, res){
  res.send('📌 Student Manager  <br/> ➢ Öğrenci eklemek için: 📎 /students/add/:name/:midtermGrade/:finalGrade <br/>  ➢ Öğrenci listesini görmek için: 📎 /students <br/>  ➢ Öğrencileri filtrelemek için: 📎 /students/:id  <br/>  kullanabilirsiniz 👍');
});


/* app.get("/students", (req, res) => {
  dbConnection.query("SELECT * FROM students", (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
    } else {
      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  });
}); */

app.get("/students", (req, res) => {
  dbConnection.query("SELECT *, (midterm_grade + final_grade) / 2 AS average FROM students", (err, results, fields) => {
  if (err) {
        console.log("Database query error: ", err);
    } 
     else {
      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  });
});


 
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;

  // Öğrencinin bilgilerini ve not ortalamasını almak için MySQL sorgusu
  const sql = "SELECT *, (midterm_grade + final_grade) / 2 AS average FROM students WHERE id = ?";

  dbConnection.query(sql, [studentId], (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
    } else {
    
        const studentData = results[0];
        const { name, age, midterm_grade, final_grade, average } = studentData;
        res.status(200).json({
          status: "success",
          data: {
            id: studentId,
            name,
            age,
            midtermGrade: midterm_grade,
            finalGrade: final_grade,
            average,
          },
        });
      }
    
  });
});

//Ekelem islemi
app.get("/students/add/:name/:midtermGrade/:finalGrade", (req, res) => {
  const { name, midtermGrade, finalGrade } = req.params;

  // MySQL sorgusu
  const sql = "INSERT INTO students (name, midterm_grade, final_grade) VALUES (?, ?, ?)";
  const values = [name, midtermGrade, finalGrade];

  // Veritabanına ekleme 
  
  dbConnection.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
    } else {
      console.log("Student added successfully");
      res.status(200).json({
        status: "success",
        data: results,
      }); 
    }
  });
});



app.listen(3000,()=>{
  console.log("Server listening on port 3000")
})
