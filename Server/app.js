const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener for events

const Logger = require("./logger");
const logger = new Logger();
logger.on("messageLogged", (args) => {
  console.log(args);
});

logger.log("hello joe");

////////////////////////////////////////////////////////////////////////

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000..");
