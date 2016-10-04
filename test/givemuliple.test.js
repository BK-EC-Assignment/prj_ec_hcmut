var expect = require('chai').expect
var request = require('superagent')
var port = require('./../bin/index').port
var database = require('../models/index.js').database
var Promise = require('bluebird-extra')

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users/give/multi'
const existUser =[
{email: 'quoc0@gmail.com', username: 'quoc0', token: 'token1'},
{email: 'quoc1@gmail.com', username: 'quoc1', token: 'token2'},
{email: 'quoc2@gmail.com', username: 'quoc2', token: 'token3'}]
const nonExistEmail = 'vltuibay@gmail.com'
const invailidToken = 'invaildtoken'

function createEnvironment(){
  return Promise.resolve(existUser)
  .mapSeries(function (user) {
    return database.create('VERTEX','Users').
    set({
      email: user.email,
      active: true,
      enable: true,
      salt: '12345',
      password: '12345678',
      rolename: 'user',
      username: user.username,
      pointgive: 100,
      pointrecv: 100
    }).one()
    .then(function (uservertex) {
      return database.create('VERTEX','Login')
      .set({
        email: user.email,
        active: true,
        token: user.token
      }).one()
      .then(function (loginvertex) {
        return database.create('EDGE','haslogin')
        .from(uservertex['@rid'])
        .to(loginvertex['@rid']).one()
      })
    })
    .then(function (value) {
      return database.delete('VERTEX').from('Users').where({
        email: nonExistEmail
      }).scalar()
    })
    .then(function (value) {
      return database.delete('VERTEX').from('Login').where({
        email: nonExistEmail
      }).scalar()
    })
  })
}

function destroyEnvironment() {
  return Promise.resolve(existUser)
  .mapSeries(function (user) {
    return database
    .delete('VERTEX')
    .from('Users')
    .where({email: user.email}).scalar()
    .then(function (value) {
      return database
      .delete('VERTEX')
      .from('Login')
      .where({email: user.email}).scalar()
    })
  })
}

describe('Test API give point multiple receiver', function () {
  before(createEnvironment)
  after(destroyEnvironment)

  it('Test API give multiple - invailid token', function (done) {
    request
      .post(USERS_PATH )
      .set('token', invailidToken)
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Please login again!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API give multiple - invailid token', function (done) {
    request
      .post(USERS_PATH )
      .set('token', existUser[0].token)
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Your data input is invalid!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API give multiple - give yourself', function (done) {
    request
      .post(USERS_PATH )
      .set('token', existUser[0].token)
      .send({
        points: 10,
        message: 'nothing',
        receiver: [existUser[0].username, existUser[0].username]
      })
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Can not give point for yourself!')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })
  it('Test API give multiple - success', function (done) {
    request
      .post(USERS_PATH )
      .set('token', existUser[0].token)
      .send({
        points: 10,
        message: 'nothing',
        receiver: [existUser[1].username, existUser[2].username]
      })
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Successful!')
        expect(res.body.meta.success).to.equal(1)
        done()
      })
  })
})
