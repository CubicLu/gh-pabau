import { mutationField, nonNull } from 'nexus'

export const JobStatusUpdateOneMutation = mutationField('updateOneJobStatus', {
  type: nonNull('JobStatus'),
  args: {
    where: nonNull('JobStatusWhereUniqueInput'),
    data: nonNull('JobStatusUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.jobStatus.update({
      where,
      data,
      ...select,
    })
  },
})
