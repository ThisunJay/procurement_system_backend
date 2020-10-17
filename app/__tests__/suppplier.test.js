/*
*  Supplier Register Test Case
*  params :
    name 
    address
    phoneNo
    email
* 
*/
const request = require('supertest')
const server = require('../../server')
describe('Supplier Endpoints', () => {
    it('should create a supplier', async () => {
        const res = await request(server)
            .post('/api/suppliers/add')
            .send({

                name: "Dev Test Supplier",
                address: "No 999, Galle",
                phoneNo: "0912232798",
                email: "ogsperera@gmail.com",

            }).set('Accept', 'application/json').expect('Content-Type', /json/)

        expect(res.statusCode).toEqual(200)

    }, 30000)
})