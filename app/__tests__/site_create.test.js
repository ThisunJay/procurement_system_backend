/*

*  Site Create Test Case
*  params :
        Site Manager,
        Address,
        Site Code 
* 
*/

const request = require('supertest')
const server = require('../../server')
describe('Site Endpoints', () => {
    it('should create a site', async () => {
        const res = await request(server)
            .post('/api/sites/create')
            .send({
                data: {
                    site_manager: "5f8b1b3c9d1b160017722f42",
                    address: "No 216, Kaluthara North",
                    site_code: "KL1250",
                }
            }).set('Accept', 'application/json').expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
    }, 10000)
})