import { queryField, nonNull, list } from 'nexus'

export const CompanyServiceFindCountQuery = queryField(
  'findManyCompanyServiceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyServiceWhereInput',
      orderBy: list('CompanyServiceOrderByWithRelationInput'),
      cursor: 'CompanyServiceWhereUniqueInput',
      distinct: 'CompanyServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyService.count(args as any)
    },
  },
)
