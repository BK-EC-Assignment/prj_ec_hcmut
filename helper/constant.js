var ERROR = {
  ERROR_DATA: {
    code: 404,
    message: 'Data invalid'
  },
  EMAIL_EXIST: {
    code: 404,
    message: 'Your email is exist!'
  },
  EMAIL_INVALID: {
    code:404,
    message: 'Your email invalid'
  },
  PASSWORD_INVALID: {
    code: 404,
    message: 'Your password incorrect'
  },
  INVALID_ACCOUNT: {
    code: 404,
    message: 'Your email or password is not correct, or your account have not registered'
  },
  HANDLE_FAIL: {
    code: 500,
    message: 'Some thing wrong, please try late!'
  },
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
