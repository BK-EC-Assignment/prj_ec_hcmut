var database = require('../../models/index.js').database

module.exports = function (input) {
  database.query('select from users where role <> "admin" ')
    .then(function (users) {
      if (!users) {
        input.error(input.done)
      }
      let response = []
      users.forEach(function (user) {
        response.push({
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
          active: user.active
        })
      })
      input.onSuccess(response.sort(function (a, b) {
        if (a.username > b.username) return 1
        if (a.username < b.username) return -1
        return 0
      }), input.done)
    })
}
