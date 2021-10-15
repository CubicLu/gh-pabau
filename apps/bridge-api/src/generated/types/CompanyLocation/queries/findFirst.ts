import { queryField, list } from 'nexus'

export const CompanyLocationFindFirstQuery = queryField(
  'findFirstCompanyLocation',
  {
    type: 'CompanyLocation',
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      distinct: 'CompanyLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
