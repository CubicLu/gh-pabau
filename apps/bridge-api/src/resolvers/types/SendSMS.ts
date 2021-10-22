import { objectType, extendType, list } from 'nexus'
import fetch from 'node-fetch'
import axios from 'axios'

export const SmsTest = objectType({
  name: 'SmsTest',
  definition(t) {
    t.string('name')
  },
})
export const SendSMS = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('SendSmsTest', {
      type: 'SmsTest',
      async resolve(parent, args) {
        try {
          return axios
            .post('https://api.textlocal.in/send/', {
              apiKey: 'QvSIMgCvR9U-eNOm93rgwXA7eSENQz2jrXmb75tji3',
              sender: 'PabauT',
              numbers: ['38970584221'],
              message: 'Pabau Test',
            })
            .then(function (response) {
              // console.log(response);
              console.log(response.data.errors)
            })
            .catch(function (error) {
              console.log(error)
            })

          // const textLocalApiKey = "QvSIMgCvR9U-eNOm93rgwXA7eSENQz2jrXmb75tji3";
          // const numbersTo = 38970584221;
          // const senderName = "PabauTest";
          // const smsMessage = "Test Pabau SMS";
          // const textlocalSendSms = "https://api.textlocal.in/send/?apikey=" + textLocalApiKey + "&numbers=" + numbersTo + "&sender=" + senderName + "&message=" + smsMessage
          //
          // return fetch(textlocalSendSms)
          //   .then((result) =>
          //     console.log(result)
          //   )
          //   .catch((error) => {
          //     throw new Error(error)
          //   })
        } catch (error) {
          return error
        }
      },
    })
  },
})
