import { mutationField, nonNull } from 'nexus'

export const CmExtraGymUpdateManyMutation = mutationField(
  'updateManyCmExtraGym',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmExtraGymWhereInput',
      data: nonNull('CmExtraGymUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraGym.updateMany(args as any)
    },
  },
)
