import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessUpdateManyMutation = mutationField(
  'updateManyThirdPartyAccess',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ThirdPartyAccessWhereInput',
      data: nonNull('ThirdPartyAccessUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.thirdPartyAccess.updateMany(args as any)
    },
  },
)
