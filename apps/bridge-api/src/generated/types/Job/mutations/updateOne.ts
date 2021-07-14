import { mutationField, nonNull } from 'nexus'

export const JobUpdateOneMutation = mutationField('updateOneJob', {
  type: nonNull('Job'),
  args: {
    where: nonNull('JobWhereUniqueInput'),
    data: nonNull('JobUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.job.update({
      where,
      data,
      ...select,
    })
  },
})
