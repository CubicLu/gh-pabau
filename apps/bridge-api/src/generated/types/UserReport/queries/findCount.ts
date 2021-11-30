import { queryField, nonNull, list } from 'nexus'

export const UserReportFindCountQuery = queryField('findManyUserReportCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByWithRelationInput'),
    cursor: 'UserReportWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserReportScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userReport.count(args as any)
  },
})
