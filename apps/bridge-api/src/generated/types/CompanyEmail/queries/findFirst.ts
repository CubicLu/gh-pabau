import { queryField, list } from 'nexus'

export const CompanyEmailFindFirstQuery = queryField('findFirstCompanyEmail', {
  type: 'CompanyEmail',
  args: {
    where: 'CompanyEmailWhereInput',
    orderBy: list('CompanyEmailOrderByInput'),
    cursor: 'CompanyEmailWhereUniqueInput',
    distinct: 'CompanyEmailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyEmail.findFirst({
      ...args,
      ...select,
    })
  },
})
