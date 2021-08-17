import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyDeleteOneMutation = mutationField(
  'deleteOneCancellationPolicy',
  {
    type: 'CancellationPolicy',
    args: {
      where: nonNull('CancellationPolicyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cancellationPolicy.delete({
        where,
        ...select,
      })
    },
  },
)
