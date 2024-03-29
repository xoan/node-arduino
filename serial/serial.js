var port_name = process.argv[2];

if (port_name == undefined) {
    console.log("Serial port name is required.");
    process.exit(1);
}

var serial = require("serialport"),
    port = new serial.SerialPort(port_name, {
        parser: serial.parsers.readline("\r\n")
    });
console.log("Opening serial port " + port_name);

var app = require("express")(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

server.listen(8080);
console.log("Listening for new clients on http://localhost:8080");
var connected = false;

app.get("/", function(request, response) {
    response.sendfile(__dirname + "/client.html");
});

io.sockets.on("connection", function(socket) {
    if (!connected) {
        port.flush();
        port.write("c");
        connected = true;
    }

    socket.on("disconnect", function() {
        port.write("x");
        connected = false;
    }).on("ledEvent", function(data) {
        port.write(data.led);
    });

    port.on("data", function(data) {
        var serial_data = JSON.parse(data);
        socket.emit("serialEvent", serial_data);
    });
});
