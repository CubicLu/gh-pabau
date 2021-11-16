import { Context } from '../../context'
import { extendType, nonNull, list, objectType } from 'nexus'
import { checkEmailPrivacy } from '../../app/communication/email-privacy.service'

export const emailPrivacy = extendType({
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
