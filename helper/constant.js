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
  INVALID_PARAMS: {
    code: 404,
    message: 'Your data input is invalid!'
  },
  MISSING_PRODUCT: {
    code: 404,
    message: 'Product not found'
  },
  MISSING_COST: {
    code: 404,
    message: 'Cost not enough!'
  },
  INVALID_TOKEN: {
    code: 404,
    message: 'Token not found'
  },
  HANDLE_FAIL: {
    code: 500,
    message: 'Some thing wrong, please try late!'
  },
  INVALID_PASSWORD: {
    code: 404,
    message: 'Your current password is not correct!'
  },
  MISSING_NEW_PASS: {
    code: 404,
    message: 'Your new password is not identical!'
  },
  MISSING_PRODUCT: {
    code: 404,
    message: 'Product is not exist'
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
