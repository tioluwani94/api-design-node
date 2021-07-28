// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var _ = require("lodash");

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static("client"));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var lions = [];
var id = 0;

const getLion = (id) => {
  return lions.find((lion) => lion.id === id);
};

const saveLion = (lion) => {
  return [...lions, lion];
};

const updateLion = (id, data) => {
  return lions.map((lion) => {
    if (lion.id === id) {
      return { ...data, id };
    }
    return lion;
  });
};
// TODO: make the REST routes to perform CRUD on lions

app.get("/lions", (req, res) => {
  res.status(200).json(lions);
});

app.get("/lions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const lion = getLion(id);
  res.status(200).json(lion);
});

app.post("/lions", (req, res) => {
  const body = req.body;
  const newLion = { ...body, id: id + 1 };
  saveLion(newLion);
  res.status(201).json(newLion);
});

app.put("/lions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  updateLion(id, body);
  const updatedLion = getLion(id);
  res.status(200).json(updatedLion);
});

app.listen(3000);
console.log("on port 3000");
