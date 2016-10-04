var expect = require('chai').expect
var request = require('superagent')
var boot = require('./../bin/index').boot
var shutdown = require('./../bin/index').shutdown
var port = require('./../bin/index').port
var database = require('../models/index.js').database
var crypto = require('crypto')


const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'
const validToken = 'abc123'
const invalidToken = 'token123'
const existEmail = 'abc123@gmail.com'
const userName = 'abc123'
const nonExistEmail = 'abc@gmail.com'
const passCurrent = '12345678'
const codeSalt = '12345'

function createEnvironment() {
  return database.delete('VERTEX').from('Login').where({
    token: invalidToken
  }).limit(1).scalar()
    .then(
      function (value) {
        return database.delete('VERTEX').from('Users').where({
          email: nonExistEmail
        }).limit(1).scalar()
      })
    .then(
      function (value) {
        return database.create('VERTEX', 'Users').set({
          email: existEmail,
          active: true,
          enable: true,
          salt: codeSalt,
          password: crypto.createHmac('sha256', codeSalt).update(passCurrent).digest('hex'),
          rolename: 'user',
          username: userName,
          pointgive: 100,
          pointrecv: 100
        }).one()
      })
    .then(function (user) {
      return database.create('VERTEX' ,'Login').set({
        email: existEmail,
        active: true,
        token: validToken
      }).one()
      .then(function (login) {
        return database.create('EDGE', 'haslogin')
          .from(user['@rid'])
          .to(login['@rid'])
          .one()
      })
    })
}

function destroyEnvironment() {
  return database.delete('VERTEX').from('Login').where({email: existEmail})
  .limit(1).scalar()
  .then(function () {
    return database.delete('VERTEX').from('Users').where({email: existEmail})
    .limit(1).scalar()
  })
}

describe('Test API Change Password', function () {
  before(function () {
    createEnvironment()
  })
  after(function () {
    destroyEnvironment()
  })

  it('Test API Change Password - Change Password with old password incorrect', function (done) {
    let data = {
      'token': validToken,
      'oldpassword': '123456789',
      'newpassword': '87654321',
      'repeat': '87654321'
    }
    request
      .put(USERS_PATH + '/change_password')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal("Your current password is not correct!")
        expect(res.body.meta.success).to.equal(0)
        done()
    })
  })

  it('Test API Change Password - Change Password with password not identical', function (done) {
    let data = {
      'token': validToken,
      'oldpassword': '12345678',
      'newpassword': '87654321',
      'repeat': '876543210'
    }
    request
      .put(USERS_PATH + '/change_password')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal("Your new password is not identical!")
        expect(res.body.meta.success).to.equal(0)
        done()
    })
  })

  it('Test API Change Password - Change Password successful!', function (done) {
    let data = {
      'token': validToken,
      'oldpassword': '12345678',
      'newpassword': '12345678',
      'repeat': '12345678'
    }
    request
      .put(USERS_PATH + '/change_password')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Successful!')
        expect(res.body.meta.success).to.equal(1)
        done()
      })
  })

})
