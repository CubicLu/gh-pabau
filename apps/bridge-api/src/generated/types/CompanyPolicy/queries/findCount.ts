import { queryField, nonNull, list } from 'nexus'

export const CompanyPolicyFindCountQuery = queryField(
  'findManyCompanyPolicyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      distinct: 'CompanyPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPolicy.count(args as any)
    },
  },
)
