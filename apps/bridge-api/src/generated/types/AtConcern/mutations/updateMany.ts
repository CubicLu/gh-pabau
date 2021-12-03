import { mutationField, nonNull } from 'nexus'

export const AtConcernUpdateManyMutation = mutationField(
  'updateManyAtConcern',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtConcernUpdateManyMutationInput'),
      where: 'AtConcernWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atConcern.updateMany(args as any)
    },
  },
)
