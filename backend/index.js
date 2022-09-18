const express = require("express");
const db = require("./config/database");
const router = require("./router/index");
const port = 5000 || process.env.SERVER;
const app = express();
try {
  db.authenticate();
  console.log("Database can connected");
} catch (err) {
  console.log("Cannot connect with database", err);
}
app.use(router);
app.listen(port, () => {
  console.log("Server running with javascript");
});
