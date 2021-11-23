import axios from 'axios'
import { NexmoResponse } from './dto'

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
    .then((response: NexmoResponse) => {
      const responseData = {
        success: false,
        message_count: 0,
      }
      if (response.data.messages[0].status === '0') {
        responseData.success = true
      }
      responseData.message_count = Number.parseInt(
        response.data['message-count']
      )
      return responseData
    })
    .catch(function (error) {
      return error
    })
}
