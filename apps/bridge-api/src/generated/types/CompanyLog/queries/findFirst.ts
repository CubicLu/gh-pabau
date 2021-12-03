import { queryField, list } from 'nexus'

export const CompanyLogFindFirstQuery = queryField('findFirstCompanyLog', {
  type: 'CompanyLog',
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByWithRelationInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyLog.findFirst({
      ...args,
      ...select,
    })
  },
})
