import { queryField, nonNull } from 'nexus'

export const JobFindUniqueQuery = queryField('findUniqueJob', {
  type: 'Job',
  args: {
    where: nonNull('JobWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.job.findUnique({
      where,
      ...select,
    })
  },
})
