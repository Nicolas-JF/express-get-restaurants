const request = require("supertest");
const app = require("./app");

describe("POST /restaurants", () => {
  it("should return an error if name is missing", async () => {
    const response = await request(app)
      .post("/restaurants")
      .send({ location: "Los Angeles", cuisine: "Italian" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        msg: "Name is required and cannot be empty or whitespace",
        param: "name",
        location: "body",
        value: ""
      }
    ]);
  });

  it("should return an error if location is missing", async () => {
    const response = await request(app)
      .post("/restaurants")
      .send({ name: "Pizza Palace", cuisine: "Italian" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        msg: "Location is required and cannot be empty or whitespace",
        param: "location",
        location: "body",
        value: ""
      }
    ]);
  });

  it("should return an error if cuisine is missing", async () => {
    const response = await request(app)
      .post("/restaurants")
      .send({ name: "Pizza Palace", location: "Los Angeles" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        msg: "Cuisine is required and cannot be empty or whitespace",
        param: "cuisine",
        location: "body",
        value: ""
      }
    ]);
  });

  it("should add a new restaurant if all fields are valid", async () => {
    const newRestaurant = {
      name: "Sushi House",
      location: "Tokyo",
      cuisine: "Japanese"
    };

    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContainEqual(newRestaurant);
  });
});