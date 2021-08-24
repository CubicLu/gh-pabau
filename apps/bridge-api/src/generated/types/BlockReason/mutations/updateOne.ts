import { mutationField, nonNull } from 'nexus'

export const BlockReasonUpdateOneMutation = mutationField(
  'updateOneBlockReason',
  {
    type: nonNull('BlockReason'),
    args: {
      where: nonNull('BlockReasonWhereUniqueInput'),
      data: nonNull('BlockReasonUpdateInput'),
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
