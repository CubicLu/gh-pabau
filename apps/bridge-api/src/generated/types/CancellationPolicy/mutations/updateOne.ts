import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyUpdateOneMutation = mutationField(
  'updateOneCancellationPolicy',
  {
    type: nonNull('CancellationPolicy'),
    args: {
      data: nonNull('CancellationPolicyUpdateInput'),
      where: nonNull('CancellationPolicyWhereUniqueInput'),
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
