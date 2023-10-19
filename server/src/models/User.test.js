const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User } = require(".");
const { db } = require("../db/config");

// define in global scope
let user;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: "gandalf" });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
  it("has an id", async () => {
    expect(user).toHaveProperty("id");
  });

  it("username is assigned correctly", async () => {
    expect(user.username).toBe("gandalf");
  });

  it("can create new instances", async () => {
    const newUser = await User.create({
      username: "ben10",
    });
    const foundUser = await User.findOne({
      where: {
        username: "ben10",
      },
    });
    expect(foundUser).toBeInstanceOf(User);
  });

  it("can be updated", async () => {
    const foundUser = await User.findOne({
      where: {
        username: "ben10",
      },
    });
    const updatedUser = await foundUser.update({
      username: "kevin",
    });
    expect(updatedUser.username).toBe("kevin");
  });

  it("can be deleted", async () => {
    const foundUser = await User.findOne({
      where: {
        username: "kevin",
      },
    });
    const deletedUser = await foundUser.destroy();
    expect(deletedUser).toEqual(foundUser);
  });
});
