import { extendType } from 'nexus'
import { Context } from '../../../context'
import { CreditCostType } from '../nexus-type'

export const CreditCost = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('creditCost', {
      type: CreditCostType,
      description: 'Get credit pricing',
      async resolve(_, input, ctx: Context) {
        const s = await ctx.prisma.companySubscription.findUnique({
          select: {
            sms_rate: true,
          },
          where: {
            company_id: ctx.authenticated.company,
          },
        })

        return [
          {
            amount: 200,
            cost: s.sms_rate,
            total: Number.parseFloat(Number(s.sms_rate * 200).toFixed(2)),
          },
          {
            amount: 500,
            cost: s.sms_rate,
            total: Number.parseFloat(Number(s.sms_rate * 500).toFixed(2)),
          },
          {
            amount: 2000,
            cost: s.sms_rate,
            total: Number.parseFloat(Number(s.sms_rate * 2000).toFixed(2)),
          },
          {
            amount: 5000,
            cost: s.sms_rate,
            total: Number.parseFloat(Number(s.sms_rate * 5000).toFixed(2)),
          },
          {
            amount: 10000,
            cost: s.sms_rate - 0.01,
            total: Number.parseFloat(
              Number((s.sms_rate - 0.01) * 10000).toFixed(2)
            ),
          },
          {
            amount: 20000,
            cost: s.sms_rate - 0.02,
            total: Number.parseFloat(
              Number((s.sms_rate - 0.02) * 20000).toFixed(2)
            ),
          },
        ]
      },
    })
  },
})
