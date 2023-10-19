const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck } = require("./index");
const { db } = require("../db/config");

let userOne;
let userTwo;
let deckOne;
let deckTwo;

describe("User-Deck association", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    userOne = await User.create({
      username: "Dash",
    });
    userTwo = await User.create({
      username: "Bash",
    });
    deckOne = await Deck.create({ name: "four-arms", xp: 1000 });
    deckTwo = await Deck.create({ name: "three-arms", xp: 1000 });
  });

  afterAll(async () => {
    await db.sync({ force: true });
  });

  it("user can only have one deck", async () => {
    await userOne.setDeck(deckTwo);
    await userOne.setDeck(deckOne);
    const user = await User.findByPk(1, {
      include: Deck,
    });
    expect(Array.isArray(user.Deck)).toBeFalsy();
  });

  it("deck can only have one user", async () => {
    await deckOne.setUser(userTwo);
    await deckOne.setUser(userOne);
    const deck = await Deck.findByPk(1, {
      include: User,
    });
    expect(Array.isArray(deck.User)).toBeFalsy();
  });
});
