import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignUpdateManyMutation = mutationField(
  'updateManyAdvertCampaign',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AdvertCampaignWhereInput',
      data: nonNull('AdvertCampaignUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.advertCampaign.updateMany(args as any)
    },
  },
)
