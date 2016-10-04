module.exports = function (responseData) {
  if (!responseData.response) {
    return {
      meta: {
        code: 200,
        message: responseData.message,
        success: 1
      },
      response: {}
    }
  }
  return {
    meta: {
      code: 200,
      message: 'Successful!',
      success: 1
    },
    response: responseData.response
  }
}
