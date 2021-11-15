import { Context } from '../../../context'
import { extendType } from 'nexus'

export const InvoiceExtended = extendType({
  type: 'InvSale',
  definition(t) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    t.field('location_name', {
      type: 'String',
      async resolve(parent: any, args, ctx: Context) {
        if (!parent.location_id) return ''

        const { name } = await ctx.prisma.companyBranch.findUnique({
          where: {
            id: parent.location_id,
          },
        })
        return name ?? ''
      },
    })
    t.field('issue_to', {
      type: 'String',
      async resolve(parent: any, args, ctx: Context) {
        //if (!parent.location_id) return ''

        return parent.customer_name ?? ''
      },
    })
  },
})
