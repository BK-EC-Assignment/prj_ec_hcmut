var expect = require('chai').expect
var request = require('superagent')
var boot = require('./../bin/index').boot
var shutdown = require('./../bin/index').shutdown
var port = require('./../bin/index').port

const ROOT_PATH = 'http://localhost:' + port
const USERS_PATH = ROOT_PATH + '/api/users'



describe('Test API service', function () {
  it('Test API add user - No parameters email ', function (done) {
    request
      .post(USERS_PATH )
      .send({token:""})
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.header['content-type']).to.have.string('application/json')
        expect(res.body.meta.message).to.equal('invailid email address')
        expect(res.body.meta.success).to.equal(0)
        done()
      })
  })
})
