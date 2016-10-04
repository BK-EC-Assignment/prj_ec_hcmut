var ERROR = {
  ERROR_DATA: {
    code: 404,
    message: 'Data invalid'
  },
  EMAIL_EXIST: {
    code: 404,
    message: 'Your email is exist!'
  }
}

var SUCCESS = {
  SUCCESSFUL: {
    code: 200,
    message: 'Successful!'
  },
  GET_RECOVER_PASS: {
    code: 200,
    message: 'Please check your email!'
  },
  RECOVER_PASS: {
    code: 200,
    message: 'Your password has been changed!'
  }
}

exports.error = ERROR
exports.success = SUCCESS
