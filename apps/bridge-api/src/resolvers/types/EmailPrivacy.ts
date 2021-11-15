import { Context } from '../../context'
import { extendType, nonNull, list } from 'nexus'
import { checkEmailPrivacy } from '../../app/communication/email-privacy.service'
import {
  EmailPrivacyResult,
  EmailMessageType,
} from '../../app/communication/nexus-type'

export const emailPrivacy = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('checkEmailPrivacy', {
      type: EmailPrivacyResult,
      args: {
        messages: nonNull(list(EmailMessageType)),
      },
      async resolve(_root, args, ctx: Context) {
        return await checkEmailPrivacy(ctx, args.messages)
      },
    })
  },
})
