import { nonNull, extendType, list } from 'nexus'
import { Context } from '../../../context'
import { findSharedCompanyIds } from '../../common'

export const findManySharedCompanyDetail = extendType({
  type: 'Query',
  definition(t) {
    t.field('findManySharedCompany', {
      type: nonNull(list('CompanyDetails')),
      description: 'Get many shared other companies',
      async resolve(_, input, ctx: Context) {
        const shared_companies_ids = await findSharedCompanyIds(ctx)

        return await ctx.prisma.companyDetails.findMany({
          where: {
            company_id: { in: shared_companies_ids },
          },
          orderBy: {
            company_name: 'asc',
          },
        })
      },
    })
  },
})
