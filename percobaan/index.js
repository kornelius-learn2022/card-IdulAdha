const express = require("express");
const app = express();
const port = 3000 || process.env.SERVER;

app.get("/", (req, res) => {
  res.send("Ini Hanya Percobaan");
});
app.listen(port, () => {
  console.log(`Hallo ini melalui host sata ${port}`);
});
