var database = require('../../models/index.js').database

module.exports = function (input) {
  return database.select().from('Users').where({
    email: input.email
  }).one()
  .then(
    function (value) {
      if (value) {
        return switchStatus(input, value)
      } else {
        input.userNotExist(input.done)
      }
    },
    function () { input.errHandle(input.done) }
  )
}

function switchStatus (input, value) {
  console.log(value.active)
  return database.update(value['@rid']).set({
    active: !(value.active)
  }).scalar()
  .then(
    function (scalar) {
      if (scalar === '1') {
        input.onSuccess(input.done, getStatus(value))
      } else {
        input.errHandle(input.done)
      }
    },
    function () { input.errHandle(input.done) }
  )
}

function getStatus (value) {
  var ret
  ret = (value.active === true) ? 'Hoạt động' : 'Tạm dừng'
  return ret
}
