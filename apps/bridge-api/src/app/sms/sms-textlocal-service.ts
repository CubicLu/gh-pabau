import axios from 'axios'

export const SendTextLocalSMS = async (args) => {
  const tlClient = axios.create({
    baseURL: 'https://api.txtlocal.com',
    params: {
      apiKey: process.env.TEXTLOCAL_API_KEY, //Text local api key
      sender: args.from,
      numbers: args.to,
      message: args.message,
    },
  })
  return tlClient
    .post('/send')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}
