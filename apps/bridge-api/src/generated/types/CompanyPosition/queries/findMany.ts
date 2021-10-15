import { queryField, nonNull, list } from 'nexus'

export const CompanyPositionFindManyQuery = queryField(
  'findManyCompanyPosition',
  {
    type: nonNull(list(nonNull('CompanyPosition'))),
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      distinct: 'CompanyPositionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
