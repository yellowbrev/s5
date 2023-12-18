const http = require("http");
const fs = require("fs");
const mysql = require("mysql");

// command to use in sql command line is authentication error pops up
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
// flush privileges;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ques11",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});


// Create a server object
const server = http.createServer((req, res) => {

    // Handle the requests
    if (req.url === "/") {
        // Send the index.html file
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("File not found");
            } 
            else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } 

    else if (req.url === "/signup") {
        
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            // Parse the data
            let data = new URLSearchParams(body);
            let username = data.get("username");
            let password = data.get("password");
            
            // Check if the username already exists
            let sql = "SELECT * FROM users WHERE username = ?";
            db.query(sql, [username], (err, result) => {
                if (err) {
                    throw err;
                }
                if (result.length > 0) {
                    // Username already exists
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end('<h1 style="color:blue;text-align:center;" >Username already taken</h1 ><a style="margin-left:50%;font-size:1.25rem;color:blue;" href="/">Go back</a>');
                } 
                else {
                    // Insert the user into the database
                    let sql = "INSERT INTO users (username, password) VALUES (?, ?)";
                    db.query(sql, [username, password], (err, result) => {
                        if (err) {
                            throw err;
                        }
                        // Registration successful
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end('<h1 style="color:blue;text-align:center;">Registration successful</h1><a style="margin-left:50%;font-size:1.25rem;color:blue;" href="/">Go back</a>');
                    });
                }
            });
        });
    }    
    else if (req.url === "/signin") {

        // Handle the signin form
        // Get the data from the request body
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            // Parse the data
            let data = new URLSearchParams(body);
            let username = data.get("username");
            let password = data.get("password");

            // Check if the username and password match
            let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            db.query(sql, [username, password], (err, result) => {
                if (err) {
                    throw err;
                }
                if (result.length > 0) {
                    // signin successful
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(`<h1 style="color:blue;text-align:center;">Welcome, ${username}</h1>`);
                } 
                else {
                    // signin failed
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(
                        '<h1 style="color:blue;text-align:center;">Invalid username or password</h1><a style="margin-left:50%;font-size:1.25rem;color:blue;" href="/">Go back</a>'
                    );
                }
            });
        });
    } 
    else {
        // Handle other requests
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("Page not found");
    }
});

server.listen(10000, () => {
    console.log("Server running on port 10000");
});
