import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignCreateOneMutation = mutationField(
  'createOneAdvertCampaign',
  {
    type: nonNull('AdvertCampaign'),
    args: {
      data: nonNull('AdvertCampaignCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.advertCampaign.create({
        data,
        ...select,
      })
    },
  },
)
