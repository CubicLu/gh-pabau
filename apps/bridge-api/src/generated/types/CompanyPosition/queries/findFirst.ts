import { queryField, list } from 'nexus'

export const CompanyPositionFindFirstQuery = queryField(
  'findFirstCompanyPosition',
  {
    type: 'CompanyPosition',
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByWithRelationInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPositionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
