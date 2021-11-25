import {
  extendType,
  list,
  nonNull,
  arg,
  inputObjectType,
  intArg,
  stringArg,
} from 'nexus'
import { Context } from '../../context'
import {
  retrieveAllBookingStatusCount,
  retrieveAllBookingChartData,
} from '../../app/booking/statuses'
import {
  BookingCountResponseType,
  BookingDetailResponseType,
  CancelBookingType,
} from '../../app/booking/nexus-type'
import { sendEmailWithTags } from '../../app/email/email-service'
import { sendSmsWithTags } from '../../app/sms/send-sms-service'

const BookingInputTypes = inputObjectType({
  name: 'BookingInputTypes',
  definition(t) {
    t.decimal('start_date')
    t.decimal('end_date')
    t.int('location_id')
    t.int('user_id')
  },
})

export const BookingExtended = extendType({
  type: 'Booking',
  definition(t) {
    t.field('Participants', {
      type: nonNull(list('User')),
      async resolve(parent: any, args, ctx: Context) {
        const usersIds = parent.participant_slave_uids
        if (!usersIds) {
          return []
        }
        const ids = []
        for (const item of usersIds?.split(',')) {
          ids.push(Number.parseInt(item))
        }
        return await ctx.prisma.user.findMany({
          where: {
            id: { in: ids },
          },
        })
      },
    })
  },
})

export const BookingStatus = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBookingStatusCount', {
      type: BookingCountResponseType,
      args: {
        data: arg({ type: BookingInputTypes }),
      },
      async resolve(_root, { data }, ctx: Context) {
        const allBookingCounts = await retrieveAllBookingStatusCount(
          ctx,
          data,
          false
        )
        const onlineBookingCounts = await retrieveAllBookingStatusCount(
          ctx,
          data,
          true
        )
        return {
          allBookingCounts: allBookingCounts,
          onlineBookingCounts: onlineBookingCounts,
        }
      },
    })
    t.field('getBookingChartDetail', {
      type: BookingDetailResponseType,
      args: {
        data: arg({ type: BookingInputTypes }),
      },
      async resolve(_root, { data }, ctx: Context) {
        return await retrieveAllBookingChartData(ctx, data)
      },
    })
  },
})

export const CancelAppointment = extendType({
  type: 'Mutation',
  definition: function (t) {
    t.field('CancelAppointment', {
      type: CancelBookingType,
      args: {
        booking_id: intArg(),
        type: stringArg(),
        reason: stringArg(),
        reason_id: intArg(),
      },
      resolve: async function (
        parent,
        { booking_id, reason, reason_id, type },
        ctx: Context
      ) {
        const responseData = {
          status: 'Success',
          appointment_status: 'Cancelled',
          send_sms: false,
          num_message_send: 0,
          email_send: false,
        }

        const updateBooking = await ctx.prisma.booking.update({
          where: {
            id: booking_id,
          },
          data: {
            status: 'Cancelled',
          },
        })
        const newChangeLogData = []
        const getChangeLogData = await ctx.prisma.bookingChangeLog.findFirst({
          where: {
            appointment_id: booking_id,
          },
        })
        newChangeLogData.push(JSON.parse(getChangeLogData.changelog)[0])
        const changelogData = {
          mode: 'Update',
          status: 'Cancelled',
        }
        newChangeLogData.push(changelogData)
        await ctx.prisma.bookingChangeLog.update({
          where: {
            appointment_id: booking_id,
          },
          data: {
            changelog: JSON.stringify(newChangeLogData),
          },
        })
        await ctx.prisma.bookingCancel.create({
          data: {
            appointment_id: booking_id,
            type: type,
            reason: reason,
            cancel_by: ctx.authenticated.user,
            cancel_reason_id: reason_id,
          },
        })

        const settings = await ctx.prisma.bookingSetting.findFirst({
          where: {
            company_id: ctx.authenticated.company,
          },
        })
        const contact = await ctx.prisma.cmContact.findFirst({
          where: {
            ID: updateBooking.contact_id,
          },
        })
        if (settings.send_sms > 0 && settings.cancel_sms_tmpl > 0) {
          const getCancelSMSMessage = await ctx.prisma.messageTemplate.findFirst(
            {
              where: {
                template_id: settings.cancel_sms_tmpl,
                template_type: 'sms',
              },
            }
          )

          const sendSmsArgs = {
            from: '',
            to: contact.Mobile,
            message: getCancelSMSMessage.message,
            contact_id: updateBooking.contact_id,
            booking_id: booking_id,
          }
          const sendSMS = await sendSmsWithTags(sendSmsArgs, ctx)

          if (sendSMS.success) {
            responseData.send_sms = true
          }
        }
        if (settings.send_email > 0 && settings.cancel_email_tmpl > 0) {
          const getCancelEmailMessage = await ctx.prisma.messageTemplate.findFirst(
            {
              where: {
                template_id: settings.cancel_email_tmpl,
                template_type: 'email',
              },
            }
          )
          const emailArgs = {
            to: contact.Email,
            subject: getCancelEmailMessage.subject,
            html: getCancelEmailMessage.message,
            relations: {
              contact_id: updateBooking.contact_id,
              staff_id: ctx.authenticated.user,
              booking_id: booking_id,
            },
          }
          const sendEmail = await sendEmailWithTags(emailArgs, ctx)
          if (sendEmail) {
            responseData.email_send = true
          }
        }
        return responseData
      },
    })
  },
})
