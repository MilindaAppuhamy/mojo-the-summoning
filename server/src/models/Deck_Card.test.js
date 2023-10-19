const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card, Deck } = require("./index");
const { db } = require("../db/config");

let cardOne;
let cardTwo;
let deckOne;
let deckTwo;

describe("User-Deck association", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    cardOne = await Card.create({
      name: "card_1",
      mojo: 100,
      stamina: 1000,
      imgUrl: "card.jpg",
    });
    cardTwo = await Card.create({
      name: "card_2",
      mojo: 200,
      stamina: 2000,
      imgUrl: "card.jpg",
    });
    deckOne = await Deck.create({ name: "four-arms", xp: 1000 });
    deckTwo = await Deck.create({ name: "three-arms", xp: 1000 });
  });

  afterAll(async () => {
    await db.sync({ force: true });
  });

  it("deck can have many cards", async () => {
    await deckOne.setCards([cardOne, cardTwo]);
    const deck = await Deck.findByPk(1, {
      include: Card,
    });
    expect(Array.isArray(deck.Cards)).toBeTruthy();
    expect(deck.Cards.length).toBe(2);
  });

  it("card can only have one deck", async () => {
    await cardOne.setDeck(deckTwo);
    await cardOne.setDeck(deckTwo);
    const card = await Card.findByPk(1, {
      include: Deck,
    });
    expect(Array.isArray(card.Deck)).toBeFalsy();
  });
});
