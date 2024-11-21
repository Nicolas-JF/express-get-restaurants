const request = require('supertest');
const app = require('./src/app');

describe('Restaurants API', () => {
  it('should return status 200 for GET /restaurants', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.status).toBe(200);
  });

  it('should return an array of restaurants from GET /restaurants', async () => {
    const response = await request(app).get('/restaurants');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return the correct number of restaurants from GET /restaurants', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return correct restaurant data from GET /restaurants', async () => {
    const response = await request(app).get('/restaurants');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('location');
    expect(response.body[0]).toHaveProperty('cuisine');
  });

  it('should return the correct restaurant data for GET /restaurants/:id', async () => {
    const restaurantId = 1;
    const response = await request(app).get(`/restaurants/${restaurantId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', restaurantId);
    expect(response.body).toHaveProperty('name');
  });

  it('should add a new restaurant and update the restaurants array on POST /restaurants', async () => {
    const newRestaurant = {
      name: 'New Restaurant',
      location: 'New York',
      cuisine: 'Italian',
    };

    const response = await request(app)
      .post('/restaurants')
      .send(newRestaurant);

    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(4);
    expect(response.body[response.body.length - 1]).toHaveProperty('name', newRestaurant.name);
  });

  it('should update a restaurant data on PUT /restaurants/:id', async () => {
    const restaurantId = 1;
    const updatedData = {
      name: 'Updated Restaurant',
      location: 'Los Angeles',
      cuisine: 'Mexican',
    };

    const response = await request(app)
      .put(`/restaurants/${restaurantId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedData.name);
    expect(response.body).toHaveProperty('location', updatedData.location);
  });

  it('should delete a restaurant on DELETE /restaurants/:id', async () => {
    const restaurantId = 1;

    const response = await request(app).delete(`/restaurants/${restaurantId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Restaurant deleted successfully');

    const getResponse = await request(app).get(`/restaurants/${restaurantId}`);
    expect(getResponse.status).toBe(404);
  });
});
