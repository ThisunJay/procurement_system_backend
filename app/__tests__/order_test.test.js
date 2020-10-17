/*
*  Create Order Test Case

* 
*/
const request = require('supertest')
const server = require('../../server')
describe('Orders Endpoints', () => {
    it('should create orders', async () => {
        const res = await request(server)
            .post('/api/orders/create')
            .send({
                data: {
                    items: [
                        {
                            item: {
                                id: "5f7e454d3d4de90c18d333c3",
                                name: "White Paint 2L",
                                price: "890"
                            },
                            quantity: 2
                        },
                        {
                            item: {
                                id: "5f7e46163d4de90c18d333c4",
                                name: "Black Paint 2L",
                                price: "890"
                            },
                            quantity: 2
                        }
                    ],
                    supplier: "5f7df51a7f2ade2d280279cf",
                    employee: "5f85fc597d324f19f8d53876",
                    date: "2020-12-25",
                    site: "5f7e420cf7a7051a7cb9f5a8",
                    state: [
                        {
                            state: 1,
                            comment: "Order Placed"
                        }
                    ]
                }
            }).set('Accept', 'application/json').expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
    }, 50000)
})