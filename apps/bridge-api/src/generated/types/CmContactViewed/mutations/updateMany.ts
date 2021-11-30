import { mutationField, nonNull } from 'nexus'

export const CmContactViewedUpdateManyMutation = mutationField(
  'updateManyCmContactViewed',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmContactViewedUpdateManyMutationInput'),
      where: 'CmContactViewedWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactViewed.updateMany(args as any)
    },
  },
)
