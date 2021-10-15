import { queryField, list } from 'nexus'

export const CompanyLogFindFirstQuery = queryField('findFirstCompanyLog', {
  type: 'CompanyLog',
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    distinct: 'CompanyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyLog.findFirst({
      ...args,
      ...select,
    })
  },
})
