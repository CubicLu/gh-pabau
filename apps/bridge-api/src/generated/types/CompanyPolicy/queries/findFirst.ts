import { queryField, list } from 'nexus'

export const CompanyPolicyFindFirstQuery = queryField(
  'findFirstCompanyPolicy',
  {
    type: 'CompanyPolicy',
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByWithRelationInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      distinct: 'CompanyPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPolicy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
