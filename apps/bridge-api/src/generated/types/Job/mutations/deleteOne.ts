import { mutationField, nonNull } from 'nexus'

export const JobDeleteOneMutation = mutationField('deleteOneJob', {
  type: 'Job',
  args: {
    where: nonNull('JobWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.job.delete({
      where,
      ...select,
    })
  },
})
