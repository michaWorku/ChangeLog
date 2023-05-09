import app from "../../server";
import request from 'supertest'

describe('Test Create New user', () => {
    it('should return message', (done: any) => {
        request(app)
            .post('/api/users')
            .send({ userName: 'hello', password: 'test1234', email: 'test@changelog.com' })
            .set('Accept', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(res.body.token).toBeTruthy()
                expect(res.headers['Content-Type']).toMatch(/json/)
                return done()
            })

    })
})