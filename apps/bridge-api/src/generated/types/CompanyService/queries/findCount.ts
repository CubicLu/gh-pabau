import { queryField, nonNull, list } from 'nexus'

export const CompanyServiceFindCountQuery = queryField(
  'findManyCompanyServiceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyServiceWhereInput',
      orderBy: list('CompanyServiceOrderByWithRelationInput'),
      cursor: 'CompanyServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyService.count(args as any)
    },
  },
)
