"use strict";
const bodyParser = require("body-parser");//
const { Client } = require("pg");
const express = require('express');


const app = express();
const port = 4000;


const client = new Client({//PostgreSQL veritabanına bağlant için Client nesnesi oluşturulur.
  user: "user",
  host: "172.27.0.5",
  database: "db",
  password: "password",
  port: 5432,
});


client.connect()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err.stack));


app.use(bodyParser.json());//JSON verileri üzerinde işlem yapılır.


app.post("/students", (req, res) => {
  const { name, midterm_grade, final_grade } = req.body;

  client.query(
    "INSERT INTO students (name, midterm_grade, final_grade) VALUES ($1, $2, $3) RETURNING *",
    [name, midterm_grade, final_grade]
  )
  .then(result => {
    const addedStudent = result.rows[0];
    res.status(201).json({
      message: "Student Successfully Added",
      student: addedStudent,
    });
  })
  .catch(error => {
    console.error("Database query error:", error.stack);
    res.status(500).send("Database's Error" + error.stack);
  });
});


app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;

  client.query("SELECT * FROM students WHERE id=$1", [studentId])
  .then(result => {
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student Not Found",
      });
    }

    const student = result.rows[0];
    const foundedStudent = {
      name: student.name,
      midterm_grade: student.midterm_grade,
      final_grade: student.final_grade,
      average: (student.final_grade + student.midterm_grade) / 2,
    };

    res.status(200).json({
      message: "Student Successfully Found",
      student: foundedStudent,
    });
  })
  .catch(error => {
    console.error("Database query error:", error.stack);
    res.status(500).send("Database's Error" + error.stack);
  });
});


app.get("/students", (req, res) => {
  client.query("SELECT * FROM students")
  .then(result => {
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Students Not Exist",
      });
    }

    const students = result.rows.map((student) => ({
      name: student.name,
      midterm_grade: student.midterm_grade,
      final_grade: student.final_grade,
      average: (student.final_grade + student.midterm_grade) / 2,
    }));

    res.status(200).json({
      message: "Students Successfully Listed",
      students: students,
    });
  })
  .catch(error => {
    console.error("Database query error:", error.stack);
    res.status(500).send("Database's Error" + error.stack);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
