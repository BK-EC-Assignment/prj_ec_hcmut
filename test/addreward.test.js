var expect = require('chai').expect
var request = require('superagent')
var port = require('./../bin/index').port
var database = require('../models/index.js').database

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/rewards'
const validToken = 'phanphuquoc'
const invalidToken = 'invaildtoken'
const existEmail = 'quocABCr@gmail.com'
const userName = 'quocABCr'
const nonExistEmail = 'vltuibay@gmail.com'

function createEnvironment(){
  return database.delete('VERTEX').from('Login').where({token: invalidToken})
  .limit(1).scalar()
  .then(
    function (value) {
      return database.delete('VERTEX').from('Users').where({email:nonExistEmail})
      .limit(1).scalar()
    })
  .then(
    function (value) {
      return database
        .create('VERTEX', 'Users').set({
          email: existEmail,
          active: true,
          enable: true,
          salt: '12345',
          password: '12345678',
          rolename: 'admin',
          username: userName,
          pointgive: 100,
          pointrecv: 100
        }).one()
    }
  )
  .then(function (user) {
    return database.create('VERTEX', 'Login').set({
      email: existEmail,
      active: true,
      token: validToken
    }).one()
    .then(
      function (login) {
        return database.create('EDGE', 'haslogin')
        .from(user['@rid'])
        .to(login['@rid']).one()
      })
  })
}
function destroyEnvironment(){
  return database.delete('VERTEX').from('Users').where({email: existEmail}).scalar()
  .then(
    function (value) {
      return database.delete('VERTEX').from('Login').where({email: existEmail}).scalar()
    }
  )
}


describe('Test API add rewards', function () {
  before(createEnvironment)
  after(destroyEnvironment)

  it('Test API add rewards - invailid token', function (done) {
    request
      .post(USERS_PATH)
      .set('token', invalidToken)
      .end(function (err, res) {
        expect(res.body.meta.success).to.equal(0)
        expect(res.body.meta.message).to.equal('Please login again!')
        done()
    })
  })
  it('Test API add rewards - vailid token, invailid point', function (done) {
    request
      .post(USERS_PATH)
      .set('token', validToken)
      .set('points', 1)
      .end(function (err, res) {
        expect(res.body.meta.success).to.equal(0)
        expect(res.body.meta.message).to.equal('Your data input is invalid!')
        done()
    })
  })

})
