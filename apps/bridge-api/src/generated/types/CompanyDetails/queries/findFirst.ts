import { queryField, list } from 'nexus'

export const CompanyDetailsFindFirstQuery = queryField(
  'findFirstCompanyDetails',
  {
    type: 'CompanyDetails',
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      distinct: 'CompanyDetailsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
