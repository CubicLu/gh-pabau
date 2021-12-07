import { extendType } from 'nexus'
import { InvTaxRate } from '@prisma/client'
import { Context } from '../../../context'

export const InvTaxRateExtended = extendType({
  type: 'InvTaxRate',
  definition(t) {
    t.field('glCode', {
      type: 'String',
      async resolve(parent: InvTaxRate, args, ctx: Context) {
        if (!parent.id) return ''

        const data = await (
          await ctx.prisma.glCode.findMany({
            where: {
              company_id: ctx.authenticated.company,
              description: 'discount',
              related_to: parent.id,
              NOT: {
                code: '',
              },
            },
          })
        ).find(function (e) {
          return e.code.trim() !== ''
        })

        return data?.code?.trim() ?? ''
      },
    })
  },
})
