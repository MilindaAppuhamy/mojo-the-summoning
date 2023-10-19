const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require("./Deck");
const { db } = require("../db/config");

// define in global scope
let deck;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: "four-arms", xp: 1000 });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Deck", () => {
  it("has an id", async () => {
    expect(deck).toHaveProperty("id");
  });

  it("name and xp are assigned correctly", async () => {
    expect(deck.name).toBe("four-arms");
    expect(deck.xp).toBe(1000);
  });

  it("can create new instances", async () => {
    const newDeck = await Deck.create({
      name: "heat-blast",
      xp: 800,
    });
    const foundDeck = await Deck.findOne({
      where: {
        name: "heat-blast",
      },
    });
    expect(foundDeck).toBeInstanceOf(Deck);
  });

  it("can be updated", async () => {
    const foundDeck = await Deck.findOne({
      where: {
        name: "heat-blast",
      },
    });
    const updatedDeck = await foundDeck.update({
      name: "ripped-jaws",
    });
    expect(updatedDeck.name).toBe("ripped-jaws");
  });

  it("can be deleted", async () => {
    const foundDeck = await Deck.findOne({
      where: {
        name: "ripped-jaws",
      },
    });
    const deletedDeck = await foundDeck.destroy();
    expect(deletedDeck).toEqual(foundDeck);
  });
});
