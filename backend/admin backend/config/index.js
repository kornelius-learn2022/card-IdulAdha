const sequelize = require("sequelize");

const db = new sequelize("card", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = db;
