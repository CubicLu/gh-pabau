import { mutationField, nonNull } from 'nexus'

export const CmExtraGymUpdateManyMutation = mutationField(
  'updateManyCmExtraGym',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmExtraGymUpdateManyMutationInput'),
      where: 'CmExtraGymWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraGym.updateMany(args as any)
    },
  },
)
