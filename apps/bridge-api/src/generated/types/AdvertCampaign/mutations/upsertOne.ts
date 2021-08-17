import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignUpsertOneMutation = mutationField(
  'upsertOneAdvertCampaign',
  {
    type: nonNull('AdvertCampaign'),
    args: {
      where: nonNull('AdvertCampaignWhereUniqueInput'),
      create: nonNull('AdvertCampaignCreateInput'),
      update: nonNull('AdvertCampaignUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.upsert({
        ...args,
        ...select,
      })
    },
  },
)
