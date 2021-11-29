import { mutationField, nonNull } from 'nexus'

export const BlockReasonUpdateOneMutation = mutationField(
  'updateOneBlockReason',
  {
    type: nonNull('BlockReason'),
    args: {
      data: nonNull('BlockReasonUpdateInput'),
      where: nonNull('BlockReasonWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.blockReason.update({
        where,
        data,
        ...select,
      })
    },
  },
)
