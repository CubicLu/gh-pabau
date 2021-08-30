import { queryField, nonNull } from 'nexus'

export const CancellationPolicyFindUniqueQuery = queryField(
  'findUniqueCancellationPolicy',
  {
    type: 'CancellationPolicy',
    args: {
      where: nonNull('CancellationPolicyWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cancellationPolicy.findUnique({
        where,
        ...select,
      })
    },
  },
)
