import { queryField, nonNull, list } from 'nexus'

export const CompanyLocationFindManyQuery = queryField(
  'findManyCompanyLocation',
  {
    type: nonNull(list(nonNull('CompanyLocation'))),
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
