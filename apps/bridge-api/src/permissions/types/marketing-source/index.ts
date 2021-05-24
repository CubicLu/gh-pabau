import { rule } from 'graphql-shield'
import { Context } from '../../../context'

export const isMarketingSourceOwnedByCompany = rule({ cache: 'contextual' })(
  async (root, args, ctx: Context) => {
    const record = await ctx.prisma.marketingSource.findFirst({
      where: {
        id: args.where.id,
      },
    })
    return record.company_id === ctx.user.company
  }
)
