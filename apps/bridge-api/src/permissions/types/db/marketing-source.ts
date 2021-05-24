import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Sample middleware for validating one specific graphql query
 */
export const marketingSource = {
  isMarketingSourceOwnedByCompany: rule({ cache: 'contextual' })(
    async (_root, { where: { id } }, ctx: Context) => {
      const record = await ctx.prisma.marketingSource.findFirst({
        where: {
          id,
        },
      })
      return record.company_id === ctx.authenticated?.company
    }
  ),
}
