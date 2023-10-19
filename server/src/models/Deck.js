const { db, DataTypes } = require("../db/config");

const Deck = db.define(
  "Deck",
  {
    name: DataTypes.STRING,
    xp: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  Deck,
};
