var expect = require('chai').expect
var request = require('superagent')
var libMessage = require('./../helper/constant')
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
          salt: '12345',
          password: crypto.createHmac('sha256', '12345').update(passCurrent).digest('hex'),
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

describe('Test API Give Point', function () {
  before(function () {
    createEnvironment()
  })
  after(function () {
    destroyEnvironment()
  })

  it('Test API Give Point - Missing token', function (done) {
    let data = {
      'points': '20',
      'receiver': 'user',
      'message': 'test missing token'
    }
    request
      .post(USERS_PATH + '/give')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_TOKEN.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Give Point - Missing points', function (done) {
    let data = {
      'receiver': 'user',
      'message': 'makes me happy'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_INPUT_POINTS.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Give Point - Missing reciever', function (done) {
    let data = {
      'points': '20',
      'message': 'makes me happy'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_RECEIVER.message)
        expect(res.body.meta.success).to.have.equal(0)
        done()
      })
  })

  it('Test API Give Point - Missing message', function (done) {
    let data = {
      'points': '20',
      'receiver': 'user'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_MESSAGE.message)
        expect(res.body.meta.success).to.have.equal(0)
        done()
      })
  })

  it('Test API Give Point - Points not enough', function (done) {
    let data = {
      'points': '2000',
      'receiver': 'user',
      'message': 'makes my happy'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_POINTS.message)
        expect(res.body.meta.success).to.have.equal(0)
        done()
      })
  })

  it('Test API Give Point - Give point to admin', function (done) {
    let data = {
      'points': '10',
      'receiver': 'admin',
      'message': 'give points to admin'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.SPECIAL_RECEIVER.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Give Point - Give point to yourself', function (done) {
    let data = {
      'points': '10',
      'receiver': userName,
      'message': 'give points to yourself'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_RECEIVER.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })


  it('Test API Give Point - Successful!', function (done) {
    let data = {
      'points': '10',
      'receiver': 'user',
      'message': 'makes me happy'
    }
    request
      .post(USERS_PATH + '/give')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.success.SUCCESSFUL.message)
        expect(res.body.meta.success).to.equal(1)
        done()
      })
    })
})
