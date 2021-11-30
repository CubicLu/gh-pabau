import { mutationField, nonNull } from 'nexus'

export const CmContactTravelUpdateManyMutation = mutationField(
  'updateManyCmContactTravel',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmContactTravelUpdateManyMutationInput'),
      where: 'CmContactTravelWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactTravel.updateMany(args as any)
    },
  },
)
