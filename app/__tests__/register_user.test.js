/*
*  Register Test Case
*  params :
        Username,
        Email,
        Password,
        Role,
        Contact Number,
        Designation 
* 
*/
const request = require('supertest')
const server = require('../../server')
describe('User Endpoints', () => {
    it('should create a user', async () => {
        const res = await request(server)
            .post('/api/users/register')
            .send({
                data: {
                    username: "JestTestFromDev",
                    email: "jestTestfromdev@gmail.com",
                    password: "Default@123",
                    role: 1,
                    contact_number: "0714498765",
                    designation: "Accountant"
                }
            }).set('Accept', 'application/json').expect('Content-Type', /json/)

        expect(res.statusCode).toEqual(200)

    }, 30000)
})