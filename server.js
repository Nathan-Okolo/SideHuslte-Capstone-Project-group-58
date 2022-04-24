const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 3000;

const requestListener = function (req, res) {
  const url = req.url;
  if (url === "/") {
    fs.readFile("./pages/index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);

      res.end();
    });
  } else if (url === "/about") {
    fs.readFile("./pages/about.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);

      res.end();
    });
  } else if (url === "/sys") {
    const myOs = {
      hostname: "the os host name",
      platform: "the os platform",
      architecture: "the os architecture",
      numberOfCPUS: "the os number of cores",
      networkInterfaces: "os network interfaces",
      uptime: "os uptime",
    };

    const data = JSON.stringify(myOs, null, 2);
    fs.writeFileSync("osinfo.json", data, (err) => {});
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Your OS info has been saved successfully!");
  } else {
    fs.readFile("./pages/404.html", function (err, data) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);

      res.end();
    });
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
