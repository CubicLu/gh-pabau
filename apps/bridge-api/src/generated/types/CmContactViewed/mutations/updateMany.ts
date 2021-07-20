import { mutationField, nonNull } from 'nexus'

export const CmContactViewedUpdateManyMutation = mutationField(
  'updateManyCmContactViewed',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmContactViewedWhereInput',
      data: nonNull('CmContactViewedUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactViewed.updateMany(args as any)
    },
  },
)
