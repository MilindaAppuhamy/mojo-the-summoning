const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Attack } = require("./Attack");
const { db } = require("../db/config");

// define in global scope
let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: "tombstone",
    mojoCost: 500,
    staminaCost: 600,
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Attack", () => {
  it("has an id", async () => {
    expect(attack).toHaveProperty("id");
  });

  it("title, mojoCost and staminaCost is assigned correctly", async () => {
    expect(attack.title).toBe("tombstone");
    expect(attack.mojoCost).toBe(500);
    expect(attack.staminaCost).toBe(600);
  });

  it("can create new instances", async () => {
    const newAttack = await Attack.create({
      title: "spear",
      mojoCost: 400,
      staminaCost: 800,
    });
    const foundAttack = await Attack.findOne({
      where: {
        title: "spear",
      },
    });
    expect(foundAttack).toBeInstanceOf(Attack);
  });

  it("can be updated", async () => {
    const foundAttack = await Attack.findOne({
      where: {
        title: "spear",
      },
    });
    const updatedAttack = await foundAttack.update({
      title: "choke-slam",
    });
    expect(updatedAttack.title).toBe("choke-slam");
  });

  it("can be deleted", async () => {
    const foundAttack = await Attack.findOne({
      where: {
        title: "choke-slam",
      },
    });
    const deletedAttack = await foundAttack.destroy();
    expect(deletedAttack).toEqual(foundAttack);
  });
});
