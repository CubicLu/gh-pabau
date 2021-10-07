import { mutationField, nonNull } from 'nexus'

export const BlockReasonCreateOneMutation = mutationField(
  'createOneBlockReason',
  {
    type: nonNull('BlockReason'),
    args: {
      data: nonNull('BlockReasonCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.blockReason.create({
        data,
        ...select,
      })
    },
  },
)
