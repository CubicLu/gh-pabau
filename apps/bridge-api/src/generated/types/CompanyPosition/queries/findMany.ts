import { queryField, nonNull, list } from 'nexus'

export const CompanyPositionFindManyQuery = queryField(
  'findManyCompanyPosition',
  {
    type: nonNull(list(nonNull('CompanyPosition'))),
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByWithRelationInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPositionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
