const { Sequelize } = require("sequelize");
const db = new Sequelize(
  "card",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  },
  {
    define: {
      freezeTableName: true,
    },
  }
);
module.exports = db;
