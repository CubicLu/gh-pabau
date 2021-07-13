import { queryField, list } from 'nexus'

export const CompanyPositionFindFirstQuery = queryField(
  'findFirstCompanyPosition',
  {
    type: 'CompanyPosition',
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      distinct: 'CompanyPositionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
