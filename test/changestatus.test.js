var expect = require('chai').expect
var request = require('superagent')
var boot = require('./../bin/index').boot
var shutdown = require('./../bin/index').shutdown
var port = require('./../bin/index').port
var database = require('../models/index.js').database

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'
const validToken = 'phanphuquoc'
const invalidToken = 'invaildtoken'
const existEmail = 'quocABC@gmail.com'
const userName = 'quocABC'
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
  return database.delete('VERTEX').from('Login').where({email: existEmail})
  .limit(1).scalar()
  .then(function () {
    return database.delete('VERTEX').from('Users').where({email: existEmail})
    .limit(1).scalar()
  })
}




describe('Test API service', function () {
  before(createEnvironment)
  after(destroyEnvironment)
  it('Test API change user status - invailid token', function (done) {
    request
      .post(USERS_PATH+'/change_status')
      .set({token: invalidToken})
      .send( {email:nonExistEmail} )
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Please login again!')
        done()
    })
  })

  it('Test API change user status - email not exist', function (done) {
    request
      .post(USERS_PATH+'/change_status')
      .set({token: validToken})
      .send( {email:nonExistEmail} )
      .end(function (err, res) {
        expect(res.body.meta.message).to.equal('Your email is not exist!')
        done()
    })
  })

  it('Test API change user status - success', function (done) {
    request
      .post(USERS_PATH+'/change_status')
      .set({token: validToken})
      .send( {email:existEmail} )
      .end(function (err, res) {
        expect(res.body.meta.success).to.equal(1)
        expect(res.body.meta.message).to.equal('Successful!')
        done()
    })
  })
})
