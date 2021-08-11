import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'

export const VerifyTwoFaCode = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('VerifyTwoFaCode', {
      type: 'Boolean',
      args: {
        pincode: nonNull(stringArg()),
      },
      async resolve(event, args, ctx: Context) {
        return true
      },
    })
  },
})
