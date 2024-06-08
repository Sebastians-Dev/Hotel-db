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

test('GET/cities debe traer todos las ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/cities debe crear una ciudad', async () => {
    const newCity = { 
        name : 'test',
        Country: 'test1',
        countryId: 'ts'
    }
    const res = await request(app)
    .post('/cities').send(newCity).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined(); 
    expect(res.body.name).toBe(newCity.name);

});

test('DELETE/cities/:id debe eliminar una ciudad', async () => {
    const res = await request(app).delete(`/cities/${id} `).send('Authorization', `Bearer${token}`);
    expect(res.status).toBe(204);
});