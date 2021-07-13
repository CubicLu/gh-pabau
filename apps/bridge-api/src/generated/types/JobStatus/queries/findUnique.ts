import { queryField, nonNull } from 'nexus'

export const JobStatusFindUniqueQuery = queryField('findUniqueJobStatus', {
  type: 'JobStatus',
  args: {
    where: nonNull('JobStatusWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.jobStatus.findUnique({
      where,
      ...select,
    })
  },
})
