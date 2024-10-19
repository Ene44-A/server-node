const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.json(item);
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  items = items.map((item) => (item.id === id ? updatedItem : item));
  res.json(updatedItem);
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  items = items.filter((item) => item.id !== id);
  res.json({ message: "Item deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
