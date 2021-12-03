import { mutationField, nonNull } from 'nexus'

export const ThirdPartyAccessUpdateManyMutation = mutationField(
  'updateManyThirdPartyAccess',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ThirdPartyAccessUpdateManyMutationInput'),
      where: 'ThirdPartyAccessWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.thirdPartyAccess.updateMany(args as any)
    },
  },
)
