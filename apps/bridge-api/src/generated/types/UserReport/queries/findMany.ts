import { queryField, nonNull, list } from 'nexus'

export const UserReportFindManyQuery = queryField('findManyUserReport', {
  type: nonNull(list(nonNull('UserReport'))),
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByInput'),
    cursor: 'UserReportWhereUniqueInput',
    distinct: 'UserReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userReport.findMany({
      ...args,
      ...select,
    })
  },
})
