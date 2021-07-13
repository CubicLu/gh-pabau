import { mutationField, nonNull } from 'nexus'

export const JobCreateOneMutation = mutationField('createOneJob', {
  type: nonNull('Job'),
  args: {
    data: nonNull('JobCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.job.create({
      data,
      ...select,
    })
  },
})
