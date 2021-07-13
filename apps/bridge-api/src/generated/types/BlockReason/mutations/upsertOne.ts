import { mutationField, nonNull } from 'nexus'

export const BlockReasonUpsertOneMutation = mutationField(
  'upsertOneBlockReason',
  {
    type: nonNull('BlockReason'),
    args: {
      where: nonNull('BlockReasonWhereUniqueInput'),
      create: nonNull('BlockReasonCreateInput'),
      update: nonNull('BlockReasonUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.blockReason.upsert({
        ...args,
        ...select,
      })
    },
  },
)
