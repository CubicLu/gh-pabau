import { queryField, list } from 'nexus'

export const CompanyFindFirstQuery = queryField('findFirstCompany', {
  type: 'Company',
  args: {
    where: 'CompanyWhereInput',
    orderBy: list('CompanyOrderByWithRelationInput'),
    cursor: 'CompanyWhereUniqueInput',
    distinct: 'CompanyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.company.findFirst({
      ...args,
      ...select,
    })
  },
})
