import {
  extendType,
  nonNull,
  stringArg,
  list,
  arg,
  inputObjectType,
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
import { validateEmail } from '../../app/authentication/yup'
import { User } from '@prisma/client'
import { Context } from '../../context'
import EmailService from '../../app/email/email-service'

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
              await new EmailService().sendEmail(args)
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
            await new EmailService().sendEmail(args)
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
      async resolve(_, args: EmailWithTagsInput, ctx: Context) {
        console.info('args:', args)
        try {
          return await new EmailService().sendEmailWithTags(args, ctx)
          // console.info('response', response)
          // return true
        } catch (error) {
          return error
        }
      },
    })
  },
})
