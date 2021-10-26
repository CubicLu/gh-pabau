import axios from 'axios'

export const SendNexmoSMS = async (from, to, message) => {
  const tlClient = axios.create({
    baseURL: 'https://rest.nexmo.com',
    params: {
      api_key: process.env.NEXMO_API_KEY, //Text local api key
      api_secret: process.env.NEXMO_API_SICRET,
      type: 'unicode',
      from: from,
      to: to,
      text: message,
    },
  })
  return tlClient
    .get('/sms/json?')
    .then(function (response) {
      // console.log(response);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
