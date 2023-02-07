const request = require("supertest");

const app = require("../src");
const { User } = require("../src/models");

describe("TESTING AUTH", () => {
  it("Should signup a user", async () => {
    const response = await request(app).post("/signup").send({
      email: "test1@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Created User Successfully");
  });

  it("Should success login", async () => {
    const response = await request(app).post("/login").send({
      email: "test1@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

afterAll(async () => {
  await User.deleteMany({});
});
