import { mutationField, nonNull } from 'nexus'

export const AtConcernUpdateManyMutation = mutationField(
  'updateManyAtConcern',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtConcernWhereInput',
      data: nonNull('AtConcernUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atConcern.updateMany(args as any)
    },
  },
)
