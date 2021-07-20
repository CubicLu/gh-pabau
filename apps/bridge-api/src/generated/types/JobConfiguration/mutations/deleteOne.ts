import { mutationField, nonNull } from 'nexus'

export const JobConfigurationDeleteOneMutation = mutationField(
  'deleteOneJobConfiguration',
  {
    type: 'JobConfiguration',
    args: {
      where: nonNull('JobConfigurationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.jobConfiguration.delete({
        where,
        ...select,
      })
    },
  },
)
