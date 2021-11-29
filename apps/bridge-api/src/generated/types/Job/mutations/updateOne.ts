import { mutationField, nonNull } from 'nexus'

export const JobUpdateOneMutation = mutationField('updateOneJob', {
  type: nonNull('Job'),
  args: {
    data: nonNull('JobUpdateInput'),
    where: nonNull('JobWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.job.update({
      where,
      data,
      ...select,
    })
  },
})
