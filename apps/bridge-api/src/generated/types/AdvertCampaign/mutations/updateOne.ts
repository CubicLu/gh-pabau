import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignUpdateOneMutation = mutationField(
  'updateOneAdvertCampaign',
  {
    type: nonNull('AdvertCampaign'),
    args: {
      data: nonNull('AdvertCampaignUpdateInput'),
      where: nonNull('AdvertCampaignWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.advertCampaign.update({
        where,
        data,
        ...select,
      })
    },
  },
)
