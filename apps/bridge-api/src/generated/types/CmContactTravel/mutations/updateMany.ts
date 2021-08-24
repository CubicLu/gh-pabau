import { mutationField, nonNull } from 'nexus'

export const CmContactTravelUpdateManyMutation = mutationField(
  'updateManyCmContactTravel',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactTravelWhereInput',
      data: nonNull('CmContactTravelUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactTravel.updateMany(args as any)
    },
  },
)
