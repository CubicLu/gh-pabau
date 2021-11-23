import { Context } from '../../context'
import { extendType, nonNull, list, objectType } from 'nexus'
import {
  checkEmailPrivacy,
  changeEmailPrivacy,
} from '../../app/communication/email-privacy.service'

export const checkPrivacy = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('checkEmailPrivacy', {
      type: objectType({
        name: 'EmailPrivacyResult',
        definition(t) {
          t.string('messageId')
          t.int('privacySetting')
        },
      }),
      args: {
        messages: nonNull(list('String')),
      },
      async resolve(_root, args, ctx: Context) {
        return await checkEmailPrivacy(ctx, args.messages)
      },
    })
  },
})

export const changePrivacy = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('changeEmailPrivacy', {
      type: objectType({
        name: 'changeEmailPrivacyResponse',
        definition(t) {
          t.boolean('success')
          t.nullable.string('error')
        },
      }),
      args: {
        fromAdress: nonNull('String'),
        toAddress: nonNull('String'),
        subject: 'String',
        messageBody: nonNull('String'),
        date: nonNull('DateTime'),
        messageId: nonNull('String'),
      },
      async resolve(_root, args, ctx: Context) {
        return await changeEmailPrivacy(ctx, args)
      },
    })
  },
})
