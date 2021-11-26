import { queryField, list } from 'nexus'

export const UserReportFindFirstQuery = queryField('findFirstUserReport', {
  type: 'UserReport',
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByWithRelationInput'),
    cursor: 'UserReportWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserReportScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userReport.findFirst({
      ...args,
      ...select,
    })
  },
})
