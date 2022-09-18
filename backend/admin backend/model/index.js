const db = require("../config/index");
const { DataTypes } = require("sequelize");
const card_contens = db.define(
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
const admin = db.define(
  "admin",
  {
    id_admin: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "admin",
  }
);
module.exports = { card_contens, admin };
