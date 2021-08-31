import { queryField, nonNull, list } from 'nexus'

export const CompanyLocationFindManyQuery = queryField(
  'findManyCompanyLocation',
  {
    type: nonNull(list(nonNull('CompanyLocation'))),
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      distinct: 'CompanyLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
