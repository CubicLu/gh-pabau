import { mutationField, nonNull } from 'nexus'

export const JobStatusCreateOneMutation = mutationField('createOneJobStatus', {
  type: nonNull('JobStatus'),
  args: {
    data: nonNull('JobStatusCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.jobStatus.create({
      data,
      ...select,
    })
  },
})
