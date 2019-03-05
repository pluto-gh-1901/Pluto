/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codyCardNumber = '1234560951637829'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        cardNumber: codyCardNumber
      })
    })

    // it('GET /api/users returns an error for not logged in', async () => {
    //   const res = await request(app)
    //     .get('/api/users')
    //     .expect(302)

    //   // expect(res.body).to.be.an('array')
    //   // expect(res.body[0].email).to.be.equal(codysEmail)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
