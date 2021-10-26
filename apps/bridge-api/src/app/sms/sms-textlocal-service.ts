import axios from 'axios'

if (process.env.TEXTLOCAL_API_KEY) {
  console.log('Initializing sendgrid with an API key...')
}

export const SendTextLocalSMS = async (args) => {
  console.log(args)
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
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
