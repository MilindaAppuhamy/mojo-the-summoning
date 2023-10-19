const { User } = require("./User");
const { Card } = require("./Card");
const { Deck } = require("./Deck");
const { Attack } = require("./Attack");

//associations
User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: "card_attack" });
Attack.belongsToMany(Card, { through: "card_attack" });

// and then export them all below
module.exports = { User, Card, Deck, Attack };
