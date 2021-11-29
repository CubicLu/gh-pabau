import { queryField, nonNull, list } from 'nexus'

export const CompanyPolicyFindCountQuery = queryField(
  'findManyCompanyPolicyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByWithRelationInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyPolicyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyPolicy.count(args as any)
    },
  },
)
