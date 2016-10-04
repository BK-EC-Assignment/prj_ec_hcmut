var expect = require('chai').expect
var request = require('superagent')
var port = require('./../bin/index').port

const ROOT_PATH = 'http://localhost:' + port
const REWARDS_PATH = ROOT_PATH + '/api/rewards'
const userToken = 'b515f8dbfb473df8baa6f9a0ebf543f4fb38fa9d4a229317835eafb99611baeb'

describe('Test API Delete Reward', function () {

  it(' Delete reward - invalid params', function (done) {
    request
      .get(REWARDS_PATH)
      .set('token', '121')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.code).to.equal(404)
        done()
      })
  })

  it(' Delete reward successful', function (done) {
    let data = {
      rewardId: '#47:0'
    }
    request
      .delete(REWARDS_PATH)
      .set('token', userToken)
      .send(data)
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.code).to.equal(200)
        done()
      })
  })
})
