import { queryField, nonNull, list } from 'nexus'

export const CompanyPolicyFindManyQuery = queryField('findManyCompanyPolicy', {
  type: nonNull(list(nonNull('CompanyPolicy'))),
  args: {
    where: 'CompanyPolicyWhereInput',
    orderBy: list('CompanyPolicyOrderByWithRelationInput'),
    cursor: 'CompanyPolicyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyPolicyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyPolicy.findMany({
      ...args,
      ...select,
    })
  },
})
