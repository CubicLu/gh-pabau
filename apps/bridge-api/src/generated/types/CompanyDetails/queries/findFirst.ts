import { queryField, list } from 'nexus'

export const CompanyDetailsFindFirstQuery = queryField(
  'findFirstCompanyDetails',
  {
    type: 'CompanyDetails',
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByWithRelationInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyDetailsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
