import { queryField, nonNull } from 'nexus'

export const CompanyEmailFindUniqueQuery = queryField(
  'findUniqueCompanyEmail',
  {
    type: 'CompanyEmail',
    args: {
      where: nonNull('CompanyEmailWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyEmail.findUnique({
        where,
        ...select,
      })
    },
  },
)
