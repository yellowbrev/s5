var http = require("http");
const server = http.createServer((req, res)=>{
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World! This is my Node.js server")
    res.end();
})

server.listen(10000,()=>{
    console.log("Server listening on port 10000");
});