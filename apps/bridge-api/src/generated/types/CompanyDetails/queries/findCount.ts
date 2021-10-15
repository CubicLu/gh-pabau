import { queryField, nonNull, list } from 'nexus'

export const CompanyDetailsFindCountQuery = queryField(
  'findManyCompanyDetailsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      distinct: 'CompanyDetailsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyDetails.count(args as any)
    },
  },
)
