import { queryField, list } from 'nexus'

export const CompanyPolicyFindFirstQuery = queryField(
  'findFirstCompanyPolicy',
  {
    type: 'CompanyPolicy',
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByWithRelationInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPolicyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPolicy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
