const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card } = require("./Card");
const { db } = require("../db/config");

// define in global scope
let card;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: "Goku",
    mojo: 1000,
    stamina: 3000,
    imgUrl: "goku.jpg",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Card", () => {
  it("has an id", async () => {
    expect(card).toHaveProperty("id");
  });

  it("name, mojo, stamina and imgUrl is assigned correctly", async () => {
    expect(card.name).toBe("Goku");
    expect(card.mojo).toBe(1000);
    expect(card.stamina).toBe(3000);
    expect(card.imgUrl).toBe("goku.jpg");
  });

  it("can create new instances", async () => {
    const newCard = await Card.create({
      name: "Dashie",
      mojo: 3000,
      stamina: 30000,
      imgUrl: "dash.jpg",
    });
    const foundCard = await Card.findOne({
      where: {
        name: "Dashie",
      },
    });
    expect(foundCard).toBeInstanceOf(Card);
  });

  it("can be updated", async () => {
    const foundCard = await Card.findOne({
      where: {
        name: "Dashie",
      },
    });
    const updatedCard = await foundCard.update({
      mojo: 5000,
    });
    expect(updatedCard.mojo).toBe(5000);
  });

  it("can be deleted", async () => {
    const foundCard = await Card.findOne({
      where: {
        name: "Dashie",
      },
    });
    const deletedCard = await foundCard.destroy();
    expect(deletedCard).toEqual(foundCard);
  });
});
