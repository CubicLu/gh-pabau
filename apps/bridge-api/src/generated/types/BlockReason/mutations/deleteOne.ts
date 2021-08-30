import { mutationField, nonNull } from 'nexus'

export const BlockReasonDeleteOneMutation = mutationField(
  'deleteOneBlockReason',
  {
    type: 'BlockReason',
    args: {
      where: nonNull('BlockReasonWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.blockReason.delete({
        where,
        ...select,
      })
    },
  },
)
