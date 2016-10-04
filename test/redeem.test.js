var expect = require('chai').expect
var request = require('superagent')
var libMessage = require('./../helper/constant')
var port = require('./../bin/index').port
var database = require('../models/index.js').database
var crypto = require('crypto')

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'

let validToken = 'cb03d41532232b9677a79a058c775b65e44828472c49d28b9b308888261c9fc0'

describe('Test API Redeem', function () {

  it('Test API Redeem - Missing token', function (done) {
    let data = {
      'rewardId': '#17:01'
    }
    request
      .post(USERS_PATH + '/redeem')
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.INVALID_TOKEN.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Redeem - Missing rewardId', function (done) {
    let data = {
      'rewardId': '#11:22'
    }
    request
      .post(USERS_PATH + '/redeem')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_REDEEM.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })

  it('Test API Redeem - Rewards Successful', function (done) {
    let data = {
      'rewardId': '#17:01'
    }
    request
      .post(USERS_PATH + '/redeem')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.SUCCESS.message)
        expect(res.body.meta.success).to.equal(1)
        done()
      })
  })

  it('Test API Redeem - Not Enough Points', function (done) {
    let data = {
      'rewardId': '#17:02'
    }
    request
      .post(USERS_PATH + '/redeem')
      .set('token', validToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal(libMessage.error.MISSING_POINTS.message)
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })
})
