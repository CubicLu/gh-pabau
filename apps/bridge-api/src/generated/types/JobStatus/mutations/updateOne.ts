import { mutationField, nonNull } from 'nexus'

export const JobStatusUpdateOneMutation = mutationField('updateOneJobStatus', {
  type: nonNull('JobStatus'),
  args: {
    data: nonNull('JobStatusUpdateInput'),
    where: nonNull('JobStatusWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.jobStatus.update({
      where,
      data,
      ...select,
    })
  },
})
