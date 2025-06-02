/** @format */

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Phonebook backend</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}, http://localhost:${PORT}`);
});
