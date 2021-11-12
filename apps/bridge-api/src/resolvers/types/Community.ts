import { extendType, intArg } from 'nexus'
import { Context } from '../../context'
import fetch from 'node-fetch'
import { BookingConfirmationEmailType } from '../../app/communication/nexus-type'
import { sendEmailWithTemplate } from '../../app/email/email-service'

export const FeatureRequestsWeeklyCount = extendType({
  type: 'Query',
  definition(t) {
    t.field('featureRequestsWeeklyAvg', {
      type: 'Int',
      description:
        'Retrieve the weekly average of feature requests from the Pabau community page',
      async resolve(_) {
        try {
          return fetch(`https://community.pabau.com/c/feature-requests/5.rss`)
            .then((result) =>
              result.text().then((text) => text.match(/<item>/g).length)
            )
            .catch((error) => {
              throw new Error(error)
            })
        } catch (error) {
          return error
        }
      },
    })
  },
})

export const sendBookingConfirmationMail = extendType({
  type: 'Mutation',
  definition: function (t) {
    t.field('SendAppointmentConfirmationMail', {
      type: BookingConfirmationEmailType,
      args: {
        booking_id: intArg(),
      },
      resolve: async function (parent, { booking_id }, ctx: Context) {
        const responseData = {
          status: 'Success',
          email_send: false,
        }
        const getBookingData = await ctx.prisma.booking.findFirst({
          where: {
            id: booking_id,
          },
        })
        const settings = await ctx.prisma.bookingSetting.findFirst()
        if (settings.send_email > 0) {
          const emailArgs = {
            contact_id: getBookingData.contact_id,
            template_id: settings.email_confirm_id,
            booking_id: booking_id,
          }
          const sendEmail = await sendEmailWithTemplate(emailArgs, ctx)
          if (sendEmail) {
            responseData.email_send = true
          }
        }
        return responseData
      },
    })
  },
})
