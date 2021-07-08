/*
*  Sign In Test Case
*  params :
        Email,
        Passeword 
* 
*/
const request = require('supertest')
const server = require('../../server')
describe('User Endpoints', () => {
    it('should login a user', async () => {
        const res = await request(server)
            .post('/api/users/signin')
            .send({
                email: "amoda@gmail.com",
                password: "asd",
            }).set('Accept', 'application/json').expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
    }, 10000)
})