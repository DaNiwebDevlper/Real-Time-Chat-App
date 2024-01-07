const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs")

const app = express()

///////--Creating a server---///////
const server = http.createServer(app)
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on PORT: ${port}`))


//////////---Pass the index.html file to server---///

app.use(express.static(__dirname + "/frontend"))
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, '/index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Handle error, for example, send a 500 Internal Server Error response
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Send the HTML content as the response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });


})


///////////---Socket.io---//////////////////

const io = require("socket.io")(server)

io.on("connection", (socket) => {
    console.log("Connectde...")

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})