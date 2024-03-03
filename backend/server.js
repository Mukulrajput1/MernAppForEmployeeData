const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");

// const upload = multer({ dest: 'uploads/' });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
// const upload = multer({
//   dest: 'uploads/',
//   limits: {
//     fileSize: 1024 * 1024 * 10
//   }
// });
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Buffer = require("buffer").Buffer;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/login", (req, res) => {
  const data = req.body;
  console.log(data);
  const query =
    "SELECT count(*) FROM t_login WHERE username = ? and password = ?";
  const values = [data.username, data.password];

  connection.query(query, values, (err, rows) => {
    if (err) {
      console.error("Error querying MySQL: ", err);
      res.status(500).send("Error querying MySQL");
      return;
    }
    const count = rows[0]["count(*)"]
    if(count){
      res.send(200)
    }
    else{
      res.send(500)
    }
    console.log(count);
  });
});
app.post("/delete", (req, res) => {
  const data = req.body;
  console.log(data);
  const query = "DELETE FROM t_employee WHERE f_email = ?";
  connection.query(query, [data.email], (err, results) => {
    if (err) {
      console.error("Error querying MySQL: ", err);
      res.status(500).send("Error querying MySQL");
      return;
    }
    res.send("ok");
  });
});
app.get("/employee", (req, res) => {
  const query = "SELECT * FROM t_employee";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error querying MySQL: ", err);
      res.status(500).send("Error querying MySQL");
      return;
    }

    res.json(rows);
  });
});
app.post("/createEmployee", upload.single("imgUpload"), (req, res) => {
  console.log(req.file);
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const imgData = req.file.buffer; // Access the file buffer from req.file
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const query = "SELECT COUNT(*) FROM t_employee WHERE f_email = ?";
  console.log(query);
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying MySQL: ", err);
      res.status(500).send("Error querying MySQL");
      return;
    }
    const count = results[0]["COUNT(*)"];
    console.log(count);

    if (count) {
      res.json({ message: "Already registered with this email" });
    } else {
      const sql =
        "INSERT INTO t_employee (f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_image) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [name, email, mobileNo, designation, gender, course, imgData],
        (err, result) => {
          if (err) {
            console.error("Error inserting data into MySQL: ", err);
            res.status(500).json({ error: "Error inserting data into MySQL" });
            return;
          }
          console.log("Data inserted into MySQL");
          res.json({ message: "Data inserted successfully" });
        }
      );
    }
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
