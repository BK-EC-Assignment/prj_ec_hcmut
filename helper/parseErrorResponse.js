module.exports = function (error) {
  if (error.code === 404) {
    return {
      meta: {
        code: error.code,
        message: error.message,
        success: 0
      },
      response: {}
    }
  }
  return {
    meta: {
      code: 500,
      message: 'Something wrong! Please try late!',
      success: 0
    },
    response: {}
  }
}
