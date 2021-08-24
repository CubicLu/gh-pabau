// thanks to https://github.com/apollographql/apollo-server/issues/4055
export const BASIC_LOGGING = {
  requestDidStart() {
    return {
      didEncounterErrors(requestContext) {
        console.error(
          'an error happened in response to query ' +
            requestContext.request.query
        )
        console.log(requestContext.errors)
      },
      willSendResponse(requestContext) {
        console.log(
          'response sent',
          JSON.stringify(requestContext?.response?.data)
        )
        console.log(requestContext.response.http)
      },
    }
  },
}
