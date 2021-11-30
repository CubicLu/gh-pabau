import { queryField, list } from 'nexus'

export const CompanyEmailFindFirstQuery = queryField('findFirstCompanyEmail', {
  type: 'CompanyEmail',
  args: {
    where: 'CompanyEmailWhereInput',
    orderBy: list('CompanyEmailOrderByWithRelationInput'),
    cursor: 'CompanyEmailWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyEmailScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyEmail.findFirst({
      ...args,
      ...select,
    })
  },
})
