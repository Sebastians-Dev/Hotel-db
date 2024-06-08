const app = require('../app');
const request = require('supertest');

let token;
let id;

beforeAll(async() => {
    const credentials = {
        email: "sebas@gmail.com",
        password: "user123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET/bookings debe traer todas las reservas', async () => {
    const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/bookings debe crear una reserva', async () => {
    const newBooking = {
        checkOut: "5-06-2024",
        checkIn: "7-06-2024"
    }
    const res = await request(app).post('/bookings').send(newBooking).set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkOut).toBe(newBooking.checkOut);
});


test('PUT / bookings/:id debe de actualizar un booking', async() => {
    const updatedBooking = {
      'checkIn': '8-06-2024'
    };
const res = await request(app).put('/bookings/'+id).send(updatedBooking).set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(res.body.checkIn).toBe(updatedBooking.checkIn);
});

test('DELETE/bookings debe eliminar una reserva ', async () => {
    const res = await request(app).delete(`/bookings/${id} `).send('Authorization', `Bearer${token}`);
    expect(res.status).toBe(204);
});