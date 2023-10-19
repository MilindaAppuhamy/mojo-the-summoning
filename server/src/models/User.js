const { db, DataTypes } = require("../db/config");

const User = db.define(
  "User",
  {
    username: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = {
  User,
};
