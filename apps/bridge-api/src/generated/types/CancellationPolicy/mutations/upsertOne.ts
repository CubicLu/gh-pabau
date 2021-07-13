import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyUpsertOneMutation = mutationField(
  'upsertOneCancellationPolicy',
  {
    type: nonNull('CancellationPolicy'),
    args: {
      where: nonNull('CancellationPolicyWhereUniqueInput'),
      create: nonNull('CancellationPolicyCreateInput'),
      update: nonNull('CancellationPolicyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.upsert({
        ...args,
        ...select,
      })
    },
  },
)
