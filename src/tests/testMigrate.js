const sequelize = require('../utils/connection');
const app = require('../app');
const request = require('supertest');


const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const testUser = {
            firtsName: "joan",
            lastName: "burbano",
            email: "sebas@gmail.com",
            password: 'user123',
            gender: 'male'
        }

        await request(app).post('/users').send(testUser);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();