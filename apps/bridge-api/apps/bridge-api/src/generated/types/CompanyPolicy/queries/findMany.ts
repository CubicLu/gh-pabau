import { queryField, nonNull, list } from 'nexus'

export const CompanyPolicyFindManyQuery = queryField('findManyCompanyPolicy', {
  type: nonNull(list(nonNull('CompanyPolicy'))),
  args: {
    where: 'CompanyPolicyWhereInput',
    orderBy: list('CompanyPolicyOrderByWithRelationInput'),
    cursor: 'CompanyPolicyWhereUniqueInput',
    distinct: 'CompanyPolicyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyPolicy.findMany({
      ...args,
      ...select,
    })
  },
})
