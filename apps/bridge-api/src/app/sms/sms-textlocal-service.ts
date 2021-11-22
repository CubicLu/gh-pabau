import axios from 'axios'
import { TextLocalResponse } from './dto'

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
    .then((response: TextLocalResponse) => {
      const responseData = {
        success: false,
        message_count: 0,
      }
      if (response.data.status === 'success') {
        responseData.success = true
      }
      responseData.message_count = response.data.num_messages
      return responseData
    })
    .catch(function (error) {
      return error
    })
}
