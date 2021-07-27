// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

var jsonData = { count: 12, message: "hey" };

const getHtml = () =>
  new Promise((resolve, reject) => {
    fs.readFile(path.join("index.html"), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

app.get("/", async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(await getHtml());
  res.end();
});

app.get("/data", (req, res) => {
  res.json(jsonData);
});

app.listen("3001", () => {
  console.log("Listening on port 3001: http://localhost:3001");
});
