import {
  extendType,
  nonNull,
  stringArg,
  list,
  arg,
  inputObjectType,
  intArg,
  objectType,
} from 'nexus'
import {
  EmailInput,
  EmailOutput,
  EmailWithTagsInput,
} from '../../app/email/dto'
import {
  EmailNexusOutput,
  DynamicTemplateData,
} from '../../app/email/nexus-type'
import { User } from '@prisma/client'
import { Context } from '../../context'
import {
  sendEmail,
  sendEmailWithTags,
  sendEmailWithTemplate,
} from '../../app/email/email-service'
import { validateEmail } from '@pabau/yup'

export const SendEmail = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('sendEmail', {
      type: EmailNexusOutput,
      args: {
        to: nonNull(list('String')),
        subject: stringArg(),
        text: stringArg(),
        html: stringArg(),
        url: stringArg(),
        templateType: stringArg(),
      },
      async resolve(_, args: EmailInput, ctx: Context) {
        const { to } = args
        const emails = typeof to === 'string' ? [to] : [...new Set(to)]
        const users = await ctx.prisma.user.findMany({
          where: {
            username: { in: emails },
            company_id: { equals: ctx.authenticated.company },
          },
        })
        for (const email of emails) {
          if (await validateEmail.validate(email)) {
            const user = users.find((el) => el.username === email)
            if (user) {
              args.name = user?.full_name
              await sendEmail(args)
            }
          }
        }
        return { success: true } as EmailOutput
      },
    })
    t.field('sendEmailWithoutLogIn', {
      type: EmailNexusOutput,
      args: {
        to: nonNull(list('String')),
        subject: stringArg(),
        text: stringArg(),
        html: stringArg(),
        templateType: stringArg(),
        fields: list(DynamicTemplateData),
      },
      async resolve(_, args: EmailInput, ctx: Context) {
        const { to } = args
        const emails = typeof to === 'string' ? [to] : [...new Set(to)]
        for (const email of emails) {
          if (await validateEmail.validate(email)) {
            const user: User = await ctx.prisma.user.findFirst({
              where: {
                username: { equals: email },
              },
            })
            args.name = user?.full_name
            await sendEmail(args)
          }
        }
        return { success: true } as EmailOutput
      },
    })
    t.field('sendEmailTo', {
      type: 'Boolean',
      args: {
        to: nonNull(list('String')),
        from: stringArg(),
        subject: nonNull('String'),
        text: nonNull('String'),
        html: nonNull('String'),
        relations: arg({
          type: inputObjectType({
            name: 'EmailRelationData',
            definition: (t) => {
              t.int('contact_id')
              t.int('lead_id')
              t.int('staff_id')
              t.int('booking_id')
              t.int('invoice_id')
            },
          }),
        }),
      },
      async resolve(_root, args: EmailWithTagsInput, ctx: Context) {
        return sendEmailWithTags(args, ctx)
      },
    })
  },
})

export const sendBookingConfirmationMail = extendType({
  type: 'Mutation',
  definition: function (t) {
    t.field('SendAppointmentConfirmationMail', {
      type: objectType({
        name: 'SendAppointmentConfirmationOutput',
        definition(t) {
          t.boolean('success')
          t.string('message')
        },
      }),
      args: {
        booking_id: intArg(),
      },
      resolve: async function (parent, { booking_id }, ctx: Context) {
        const getBookingData = await ctx.prisma.booking.findFirst({
          where: {
            id: booking_id,
          },
          select: {
            id: true,
            UID: true,
            Contact: {
              select: {
                ID: true,
                Email: true,
              },
            },
          },
        })
        const settings = await ctx.prisma.bookingSetting.findFirst()
        if (settings.send_email < 1) {
          return {
            success: false,
            message: 'No email permission',
          }
        }
        const emailArgs = {
          contact_id: getBookingData.Contact.ID,
          template_id: settings.email_confirm_id,
          booking_id: getBookingData.id,
          email: getBookingData.Contact.Email,
          user_id: getBookingData.UID,
        }
        return await sendEmailWithTemplate(emailArgs, ctx)
      },
    })
  },
})
