import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyUpdateOneMutation = mutationField(
  'updateOneCancellationPolicy',
  {
    type: nonNull('CancellationPolicy'),
    args: {
      where: nonNull('CancellationPolicyWhereUniqueInput'),
      data: nonNull('CancellationPolicyUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cancellationPolicy.update({
        where,
        data,
        ...select,
      })
    },
  },
)
