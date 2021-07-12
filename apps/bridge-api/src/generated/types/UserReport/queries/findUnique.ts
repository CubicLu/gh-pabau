import { queryField, nonNull } from 'nexus'

export const UserReportFindUniqueQuery = queryField('findUniqueUserReport', {
  type: 'UserReport',
  args: {
    where: nonNull('UserReportWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.userReport.findUnique({
      where,
      ...select,
    })
  },
})
