import { mutationField, nonNull } from 'nexus'

export const CancellationPolicyCreateOneMutation = mutationField(
  'createOneCancellationPolicy',
  {
    type: nonNull('CancellationPolicy'),
    args: {
      data: nonNull('CancellationPolicyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cancellationPolicy.create({
        data,
        ...select,
      })
    },
  },
)
