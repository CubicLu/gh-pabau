import axios from 'axios'

export const SendNexmoSMS = async (args) => {
  const tlClient = axios.create({
    baseURL: 'https://rest.nexmo.com',
    params: {
      api_key: process.env.NEXMO_API_KEY, //Text local api key
      api_secret: process.env.NEXMO_API_SICRET,
      type: 'unicode',
      from: args.from,
      to: args.to,
      text: args.message,
    },
  })
  return tlClient
    .get('/sms/json?')
    .then(function (response) {
     return response.data
    })
    .catch(function (error) {
      return error
    })
}
