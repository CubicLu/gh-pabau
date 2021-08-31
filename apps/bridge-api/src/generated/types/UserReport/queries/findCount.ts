import { queryField, nonNull, list } from 'nexus'

export const UserReportFindCountQuery = queryField('findManyUserReportCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByWithRelationInput'),
    cursor: 'UserReportWhereUniqueInput',
    distinct: 'UserReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userReport.count(args as any)
  },
})
