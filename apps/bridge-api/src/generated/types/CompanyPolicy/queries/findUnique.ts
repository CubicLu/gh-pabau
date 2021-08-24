import { queryField, nonNull } from 'nexus'

export const CompanyPolicyFindUniqueQuery = queryField(
  'findUniqueCompanyPolicy',
  {
    type: 'CompanyPolicy',
    args: {
      where: nonNull('CompanyPolicyWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyPolicy.findUnique({
        where,
        ...select,
      })
    },
  },
)
