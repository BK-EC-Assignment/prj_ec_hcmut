var expect = require('chai').expect
var request = require('superagent')
var libMessage = require('./../helper/constant')
var shutdown = require('./../bin/index').shutdown
var port = require('./../bin/index').port

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'

let loginToken = 'c8d0d79a66059948e53135f0841e481f6fa74f21194cceb8943ba90cf34521ba'

describe('Test API Logout', function () {
  it('Test API Logout - No parameters', function (done) {
    request
      .post(USERS_PATH + '/logout')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_PARAMS.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Logout - Logout successful!', function (done) {
    request
      .post(USERS_PATH + '/logout')
      .send({token: loginToken})
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.success.SUCCESSFUL.message)
        expect(res.body.meta.success).to.equal(1)
        done()
      })
  })

  it('Test API Logout - User is not login!', function (done) {
    request
      .post(USERS_PATH + '/logout')
      .send({token: loginToken})
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_TOKEN.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  after(function () {
    shutdown()
  })
})
