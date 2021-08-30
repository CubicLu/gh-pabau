import { queryField, nonNull } from 'nexus'

export const CompanyDetailsFindUniqueQuery = queryField(
  'findUniqueCompanyDetails',
  {
    type: 'CompanyDetails',
    args: {
      where: nonNull('CompanyDetailsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyDetails.findUnique({
        where,
        ...select,
      })
    },
  },
)
