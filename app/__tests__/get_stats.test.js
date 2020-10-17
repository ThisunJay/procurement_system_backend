/*
*  Stats Test Case
*  
* 
*/
const request = require('supertest')
const server = require('../../server')
describe('Stats Endpoints', () => {
    it('should get stats', async () => {
        const res = await request(server)
            .get('/api/stats/all')
        expect(res.status).toBe(200)
    }, 10000)
})