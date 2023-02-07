const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src");
const { Event } = require("../src/models");

class MongoId {
  static isMongoId(value) {
    return mongoose.Types.ObjectId.isValid(value);
  }
}

describe("POST /event", () => {
  let eventId;

  test("Should created event", async () => {
    const response = await request(app).post("/event").send({
      name: "Event",
      date: Date.now(),
      startTime: "10:00",
      endTime: "23:00",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Created Event Successfully");
  });

  test("Should find all events", async () => {
    const response = await request(app).get("/events");

    expect(response.statusCode).toBe(200);
    expect(response.body.events).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );

    eventId = response.body.events[0]._id;

    response.body?.events?.forEach((event) => {
      expect(event).toHaveProperty("_id");
      expect(event).toHaveProperty("name");
      expect(event).toHaveProperty("date");
      expect(event).toHaveProperty("startTime");
      expect(event).toHaveProperty("endTime");
      expect(event).toHaveProperty("createdAt");
      expect(event).toHaveProperty("updatedAt");
      expect(event).toHaveProperty("status");
    });
  });

  test("Should update event", async () => {
    const response = await request(app).put(`/event/${eventId}`).send({
      name: "Update Event",
      date: Date.now(),
      startTime: "10:00",
      endTime: "23:00",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Update event Successfully");
  });

  test("Should delete event", async () => {
    const response = await request(app).delete(`/event/${eventId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Delete event Successfully");
  });
});

afterAll(async () => {
  await Event.deleteMany({});
});
