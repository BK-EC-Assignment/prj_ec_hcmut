var expect = require('chai').expect
var request = require('superagent')
var port = require('./../bin/index').port

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'

describe("Test API Get user's points", function () {

  it("Get user's points", function (done) {
    request
      .get(USERS_PATH + '/points')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        done()
      })
  })
})
