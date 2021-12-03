import { queryField, list } from 'nexus'

export const CompanyLocationFindFirstQuery = queryField(
  'findFirstCompanyLocation',
  {
    type: 'CompanyLocation',
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
