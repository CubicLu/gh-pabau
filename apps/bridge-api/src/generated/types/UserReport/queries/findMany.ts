import { queryField, nonNull, list } from 'nexus'

export const UserReportFindManyQuery = queryField('findManyUserReport', {
  type: nonNull(list(nonNull('UserReport'))),
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByWithRelationInput'),
    cursor: 'UserReportWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserReportScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userReport.findMany({
      ...args,
      ...select,
    })
  },
})
