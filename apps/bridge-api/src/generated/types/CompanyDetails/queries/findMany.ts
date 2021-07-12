import { queryField, nonNull, list } from 'nexus'

export const CompanyDetailsFindManyQuery = queryField(
  'findManyCompanyDetails',
  {
    type: nonNull(list(nonNull('CompanyDetails'))),
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      distinct: 'CompanyDetailsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.findMany({
        ...args,
        ...select,
      })
    },
  },
)
