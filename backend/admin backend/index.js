const express = require("express");
const db = require("./config/index");
const cookieParse = require("cookie-parser");
const cookieSession = require("cookie-session");
const router = require("./router/index");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParse());

app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
