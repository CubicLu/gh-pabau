import { queryField, list } from 'nexus'

export const CompanyServiceFindFirstQuery = queryField(
  'findFirstCompanyService',
  {
    type: 'CompanyService',
    args: {
      where: 'CompanyServiceWhereInput',
      orderBy: list('CompanyServiceOrderByWithRelationInput'),
      cursor: 'CompanyServiceWhereUniqueInput',
      distinct: 'CompanyServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyService.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
