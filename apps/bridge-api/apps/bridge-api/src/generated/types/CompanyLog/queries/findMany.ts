import { queryField, nonNull, list } from 'nexus'

export const CompanyLogFindManyQuery = queryField('findManyCompanyLog', {
  type: nonNull(list(nonNull('CompanyLog'))),
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByWithRelationInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    distinct: 'CompanyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyLog.findMany({
      ...args,
      ...select,
    })
  },
})
