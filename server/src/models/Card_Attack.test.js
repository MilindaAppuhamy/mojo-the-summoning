const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card, Attack } = require("./index");
const { db } = require("../db/config");

let cardOne;
let cardTwo;
let attackOne;
let attackTwo;

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
    attackOne = await Attack.create({
      title: "attack_1",
      mojoCost: 10,
      staminaCost: 100,
    });
    attackTwo = await Attack.create({
      title: "attack_1",
      mojoCost: 20,
      staminaCost: 150,
    });
  });

  afterAll(async () => {
    await db.sync({ force: true });
  });

  it("attack can be in many cards", async () => {
    await attackOne.setCards([cardOne, cardTwo]);
    const attack = await Attack.findByPk(1, {
      include: Card,
    });
    expect(Array.isArray(attack.Cards)).toBeTruthy();
    expect(attack.Cards.length).toBe(2);
  });

  it("card can have many attacks", async () => {
    await cardOne.setAttacks([attackOne, attackTwo]);
    const card = await Card.findByPk(1, {
      include: Attack,
    });
    expect(Array.isArray(card.Attacks)).toBeTruthy();
    expect(card.Attacks.length).toBe(2);
  });
});
