var expect = require('chai').expect
var request = require('superagent')
var libMessage = require('./../helper/constant')
var port = require('./../bin/index').port

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'

describe('Test API Login', function () {
  it('Test API Login - No parameters', function (done) {
    request
      .post(USERS_PATH + '/login')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_PARAMS.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Login - Login successful!', function (done) {
    let data = {
      'email': 'hiep.vv@geekup.vn',
      'password': '123456789'
    }
    request
      .post(USERS_PATH + '/login')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.success.SUCCESSFUL.message)
        expect(res.body.meta.success).to.equal(1)
        expect(res.body.response.user.information.email).to.equal(data.email)
        done()
      })
  })

  it('Test API Login - Password is not correct', function (done) {
    let data = {
      'email': 'hiep.vv@geekup.vn',
      'password': '1'
    }
    request
      .post(USERS_PATH + '/login')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_ACCOUNT.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Login - Email is not correct', function (done) {
    let data = {
      'email': 'hiep.vv@geekup.vnn',
      'password': '123456789'
    }
    request
      .post(USERS_PATH + '/login')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_ACCOUNT.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })
})
