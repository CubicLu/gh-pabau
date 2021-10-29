import { Context } from '../../context'
import { prepareMessage } from '../../app/email/merge-tags.service'
import moment from 'moment'

export const getCommunicationScheduled = async (
  contactId: number,
  ctx: Context
) => {
  const bookingReminders = await getScheduledBookingReminders(contactId, ctx)
  const bookingSurveys = await getScheduledBookingSurveys(contactId, ctx)
  const recalls = await getScheduledRecalls(contactId, ctx)

  const scheduled = [...bookingReminders, ...bookingSurveys, ...recalls].sort(
    (a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf()
    }
  )

  return scheduled
}

const getScheduledBookingReminders = async (
  contactId: number,
  ctx: Context
) => {
  const bookingSettings = await getBookingSettings(ctx)
  const email_id = bookingSettings.email_reminder_id
  const sms_id = bookingSettings.sms_id
  if (!sms_id && !email_id) {
    return []
  }

  const bookings = await ctx.prisma.booking.findMany({
    where: {
      contact_id: { equals: contactId },
      start_date: {
        gte: Number.parseInt(moment().format('YYYYMMDDHHmmss')),
      },
      status: { not: 'Cancelled' },
      AND: {
        OR: [
          { sent_email_reminder: { equals: true } },
          { sent_sms: { equals: 1 } },
        ],
      },
    },
    select: {
      id: true,
      start_date: true,
      Contact: {
        select: {
          ID: true,
          Email: true,
          Mobile: true,
          Fname: true,
          Lname: true,
        },
      },
    },
  })
  if (!bookings || bookings.length === 0) {
    return []
  }

  const emailTemplate = await getTemplate(email_id, ctx)
  const smsTemplate = await getTemplate(sms_id, ctx)
  if (!emailTemplate && !smsTemplate) {
    return []
  }

  const scheduled = []
  for (const booking of bookings) {
    if (emailTemplate) {
      scheduled.push({
        type: 'Email',
        date: moment(booking.start_date, 'YYYYMMDDHHmmss')
          .subtract(bookingSettings.sms_days_before, 'day')
          .format(),
        recipient: {
          recipientId: booking.Contact.ID,
          firstName: booking.Contact.Fname,
          lastName: booking.Contact.Lname,
          email: booking.Contact.Email,
          mobile: booking.Contact.Mobile,
        },
        from: '',
        subject: emailTemplate.subject,
        message: await prepareMessage(emailTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: booking.id,
        }),
      })
    }
    if (smsTemplate) {
      scheduled.push({
        type: 'SMS',
        date: moment(booking.start_date, 'YYYYMMDDHHmmss')
          .subtract(bookingSettings.sms_days_before, 'day')
          .format(),
        recipient: {
          recipientId: booking.Contact.ID,
          firstName: booking.Contact.Fname,
          lastName: booking.Contact.Lname,
          email: booking.Contact.Email,
          mobile: booking.Contact.Mobile,
        },
        from: '',
        subject: smsTemplate.subject,
        message: await prepareMessage(smsTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: booking.id,
        }),
      })
    }
  }

  return scheduled
}

const getScheduledBookingSurveys = async (contactId: number, ctx: Context) => {
  const surveySettings = await getSurveySettings(ctx)
  const email_id = surveySettings.email_message_id
  const sms_id = surveySettings.sms_message_id
  if (!sms_id && !email_id) {
    return []
  }

  const bookings = await ctx.prisma.booking.findMany({
    where: {
      contact_id: { equals: contactId },
      start_date: {
        gte: Number.parseInt(moment().format('YYYYMMDDHHmmss')),
      },
      status: { not: 'Cancelled' },
      sent_survey: { equals: 1 },
    },
    select: {
      id: true,
      start_date: true,
      Contact: {
        select: {
          ID: true,
          Email: true,
          Mobile: true,
          Fname: true,
          Lname: true,
        },
      },
    },
  })
  if (!bookings || bookings.length === 0) {
    return []
  }

  const emailTemplate = await getTemplate(email_id, ctx)
  const smsTemplate = await getTemplate(sms_id, ctx)
  if (!emailTemplate && !smsTemplate) {
    return []
  }

  const scheduled = []
  for (const booking of bookings) {
    if (emailTemplate) {
      scheduled.push({
        type: 'Email',
        date: moment(booking.start_date, 'YYYYMMDDHHmmss')
          .add(surveySettings.sms_days_after, 'day')
          .format(),
        recipient: {
          recipientId: booking.Contact.ID,
          firstName: booking.Contact.Fname,
          lastName: booking.Contact.Lname,
          email: booking.Contact.Email,
          mobile: booking.Contact.Mobile,
        },
        from: '',
        subject: emailTemplate.subject,
        message: await prepareMessage(emailTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: booking.id,
        }),
      })
    }
    if (smsTemplate) {
      scheduled.push({
        type: 'SMS',
        date: moment(booking.start_date, 'YYYYMMDDHHmmss')
          .add(surveySettings.sms_days_after, 'day')
          .format(),
        recipient: {
          recipientId: booking.Contact.ID,
          firstName: booking.Contact.Fname,
          lastName: booking.Contact.Lname,
          email: booking.Contact.Email,
          mobile: booking.Contact.Mobile,
        },
        from: '',
        subject: smsTemplate.subject,
        message: await prepareMessage(smsTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: booking.id,
        }),
      })
    }
  }

  return scheduled
}

const getScheduledRecalls = async (contactId: number, ctx: Context) => {
  const recalls = []
  const scheduledRecalls = await ctx.prisma.recallSchedule.findMany({
    where: {
      contact_id: { equals: contactId },
      scheduled_date: { gte: new Date() },
      AND: {
        OR: [{ email_sent: { equals: 1 } }, { sms_sent: { equals: 1 } }],
      },
    },
    select: {
      scheduled_date: true,
      email_sent: true,
      sms_sent: true,
      booking_id: true,
      Recall: {
        select: {
          send_email: true,
          send_sms: true,
          email_from: true,
          sms_from: true,
        },
      },
      Contact: {
        select: {
          ID: true,
          Email: true,
          Mobile: true,
          Fname: true,
          Lname: true,
        },
      },
    },
  })

  for (const recall of scheduledRecalls) {
    if (recall.email_sent === 1 && recall.Recall.send_email) {
      const emailTemplate = await getTemplate(recall.Recall.send_email, ctx)
      recalls.push({
        type: 'Email',
        date: moment(recall.scheduled_date).format(),
        recipient: {
          recipientId: recall.Contact.ID,
          firstName: recall.Contact.Fname,
          lastName: recall.Contact.Lname,
          email: recall.Contact.Email,
          mobile: recall.Contact.Mobile,
        },
        from: '',
        subject: emailTemplate.subject,
        message: await prepareMessage(emailTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: recall.booking_id,
        }),
      })
    }
    if (recall.sms_sent === 1 && recall.Recall.send_sms) {
      const smsTemplate = await getTemplate(recall.Recall.send_sms, ctx)
      recalls.push({
        type: 'SMS',
        date: moment(recall.scheduled_date).format(),
        recipient: {
          recipientId: recall.Contact.ID,
          firstName: recall.Contact.Fname,
          lastName: recall.Contact.Lname,
          email: recall.Contact.Email,
          mobile: recall.Contact.Mobile,
        },
        from: '',
        subject: smsTemplate.subject,
        message: await prepareMessage(smsTemplate.message, ctx, {
          contact_id: contactId,
          booking_id: recall.booking_id,
        }),
      })
    }
  }
  return recalls
}

const getBookingSettings = async (ctx: Context) => {
  return await ctx.prisma.bookingSetting.findUnique({
    where: {
      company_id: ctx.authenticated.company,
    },
    select: {
      email_reminder_id: true,
      sms_id: true,
      sms_days_before: true,
    },
  })
}

const getSurveySettings = async (ctx: Context) => {
  return await ctx.prisma.socialSurvey.findUnique({
    where: {
      company_id: ctx.authenticated.company,
    },
    select: {
      email_message_id: true,
      sms_message_id: true,
      sms_days_after: true,
    },
  })
}

const getTemplate = async (templateId: number, ctx: Context) => {
  return await ctx.prisma.messageTemplate.findUnique({
    where: {
      template_id: templateId,
    },
    select: {
      subject: true,
      message: true,
    },
  })
}
