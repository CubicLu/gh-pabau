import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignUpdateManyMutation = mutationField(
  'updateManyAdvertCampaign',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AdvertCampaignUpdateManyMutationInput'),
      where: 'AdvertCampaignWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.advertCampaign.updateMany(args as any)
    },
  },
)
