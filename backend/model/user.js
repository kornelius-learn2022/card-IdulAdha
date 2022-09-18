const db = require("../config/database");
const { DataTypes } = require("sequelize");
const card_content = db.define(
  "card_contents",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    nama_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesan_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_dibuat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    no_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    keluarga: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "card_contents",
  }
);
module.exports = card_content;
