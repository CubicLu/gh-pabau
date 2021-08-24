import { mutationField, nonNull } from 'nexus'

export const JobStatusDeleteOneMutation = mutationField('deleteOneJobStatus', {
  type: 'JobStatus',
  args: {
    where: nonNull('JobStatusWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.jobStatus.delete({
      where,
      ...select,
    })
  },
})
