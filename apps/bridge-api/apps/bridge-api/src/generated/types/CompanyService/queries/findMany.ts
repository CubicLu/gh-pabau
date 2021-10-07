import { queryField, nonNull, list } from 'nexus'

export const CompanyServiceFindManyQuery = queryField(
  'findManyCompanyService',
  {
    type: nonNull(list(nonNull('CompanyService'))),
    args: {
      where: 'CompanyServiceWhereInput',
      orderBy: list('CompanyServiceOrderByWithRelationInput'),
      cursor: 'CompanyServiceWhereUniqueInput',
      distinct: 'CompanyServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyService.findMany({
        ...args,
        ...select,
      })
    },
  },
)
