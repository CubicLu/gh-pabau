import { queryField, nonNull, list } from 'nexus'

export const CompanyEmailFindManyQuery = queryField('findManyCompanyEmail', {
  type: nonNull(list(nonNull('CompanyEmail'))),
  args: {
    where: 'CompanyEmailWhereInput',
    orderBy: list('CompanyEmailOrderByWithRelationInput'),
    cursor: 'CompanyEmailWhereUniqueInput',
    distinct: 'CompanyEmailScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyEmail.findMany({
      ...args,
      ...select,
    })
  },
})
