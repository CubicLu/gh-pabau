import { queryField, nonNull, list } from 'nexus'

export const CompanyDetailsFindManyQuery = queryField(
  'findManyCompanyDetails',
  {
    type: nonNull(list(nonNull('CompanyDetails'))),
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByWithRelationInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyDetailsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.findMany({
        ...args,
        ...select,
      })
    },
  },
)
