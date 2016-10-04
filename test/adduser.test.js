var expect = require('chai').expect
var request = require('superagent')
var boot = require('./../bin/index').boot
var shutdown = require('./../bin/index').shutdown
var port = require('./../bin/index').port
var database = require('../models/index.js').database

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'

const adminEmail = 'quocABC2@gmail.com'
const adminName = 'quocABC2'
const vailidToken = 'phanphuquoc'
const inactiveToken = 'inactive'
const invailidToken = 'invailid'
const invailidEmail = 'quoc<>hhh'
const vailidEmail = 'quoc109@gmail.com'
const useremail = 'quoc@gmail.com'
const usertoken = 'quoc'
const username = 'quoc'


function createEnvironment(){
  return database
    .create('VERTEX', 'Users').set({
      email: adminEmail,
      active: true,
      enable: true,
      salt: '12345',
      password: '12345678',
      rolename: 'admin',
      username: adminName,
      pointgive: 100,
      pointrecv: 100
    }).one()
    .then(function (user) {
      return database.create('VERTEX', 'Login').set({
        email: adminEmail,
        active: true,
        token: vailidToken
      }).one()
      .then(
        function (login) {
          return database.create('EDGE', 'haslogin')
          .from(user['@rid'])
          .to(login['@rid']).one()
      })
      .then(
        function (loginEdge) {
          return database.create('VERTEX', 'Login').set({
            email: adminEmail,
            active: false,
            token: inactiveToken
          }).one()
        })
      .then(
        function (login) {
          return database.create('EDGE', 'haslogin')
          .from(user['@rid'])
          .to(login['@rid']).one()
      })
      .then(
        function (value) {
          return database.delete('VERTEX').from('Users').where({email:vailidEmail})
          .limit(1).scalar()
        }
      )

    })
    .then(
      function () {
        return database
          .create('VERTEX', 'Users').set({
            email: useremail,
            active: true,
            enable: true,
            salt: '12345',
            password: '12345678',
            rolename: 'user',
            username: username,
            pointgive: 100,
            pointrecv: 100
          }).one()
          .then(function (user) {
            return database.create('VERTEX', 'Login').set({
              email: useremail,
              active: true,
              token: usertoken
            }).one()
            .then(
              function (login) {
                return database.create('EDGE', 'haslogin')
                .from(user['@rid'])
                .to(login['@rid']).one()
            })
          })
        })
}
function destroyEnvironment() {
  return database.delete('VERTEX').from('Login').where({email: adminEmail})
  .limit(2).scalar()
  .then(function () {
    return database.delete('VERTEX').from('Users').where({email: adminEmail})
    .limit(1).scalar()
  })
  .then(function () {
    return database.delete('VERTEX').from('Users').where({email: vailidEmail})
    .limit(1).scalar()
  })
  .then(function () {
    return database.delete('VERTEX').from('Login').where({email: useremail})
    .limit(2).scalar()
    .then(function () {
      return database.delete('VERTEX').from('Users').where({email: useremail})
      .limit(1).scalar()
    })
  })
}


describe('Test API service', function () {
  before(createEnvironment)
  after(destroyEnvironment)

  it('Test API add user - No parameters email ', function (done) {
    request
      .post(USERS_PATH )
      .send({token: invailidToken})
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Your data input is invalid!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API add user - email invailid', function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: invailidEmail,
        token: invailidToken
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Your data input is invalid!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API add user - token missing', function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: vailidEmail
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Please login again!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API add user - token not match', function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: vailidEmail,
        token: invailidToken
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Please login again!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API add user - token not activate', function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: vailidEmail,
        token: inactiveToken
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Please login again!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it("Test API add user - don't have right to add", function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: vailidEmail,
        token: usertoken
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal("Your don't have permission!")
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it("Test API add user - success", function (done) {
    request
      .post(USERS_PATH )
      .send({
        email: vailidEmail,
        token: vailidToken
      })
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('Successful!')
        expect(res.body.meta.success).to.equal(1)
        done()
      })
  })
})
