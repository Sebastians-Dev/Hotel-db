const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async() => {
    const credentials = {
        email: "sebas@gmail.com",
        password: "user123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST/hotels debe crear un hotel', async () => {
    const newHotel = {
        name: 'test',
        description: 'test hotel',
        price: 2000,
        address: 'calle test',
        lat: 1.15284,
        lon: -76.65208,
        cityId:1
    }
    const res = await request(app).post('/hotels').send(newHotel).set("Authorization", `Bearer ${token}`);
    id = res.body.id
    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newHotel.name);
});

test('GET/hotels debe traer todos los hoteles', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});



test('DELETE/htels/:id debe eliminar un hotel', async () => {
    const res = await request(app).delete(`/hotels/${id}`).send("Authorization", `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(204);
});
