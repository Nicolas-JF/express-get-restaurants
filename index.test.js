const request = require('supertest');
const app = require('./src/app');

describe('POST /restaurants', () => {
  it('should return an error if name is missing', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send({ location: 'body', cuisine: 'Italian' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body", // Added location field
        msg: "Name is required and cannot be empty or whitespace",
        path: "name",
        type: "field",
        value: "",
      },
    ]);
  });

  it('should return an error if location is missing', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send({ name: 'Pasta Place', cuisine: 'Italian' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body", // Added location field
        msg: "Location is required and cannot be empty or whitespace",
        path: "location",
        type: "field",
        value: "",
      },
    ]);
  });

  it('should return an error if cuisine is missing', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send({ name: 'Pasta Place', location: 'Rome' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body", // Added location field
        msg: "Cuisine is required and cannot be empty or whitespace",
        path: "cuisine",
        type: "field",
        value: "",
      },
    ]);
  });

  it('should add a new restaurant if all fields are valid', async () => {
    const response = await request(app)
      .post('/restaurants')
      .send({ name: 'Pasta Place', location: 'Rome', cuisine: 'Italian' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Pasta Place');
  });
});
