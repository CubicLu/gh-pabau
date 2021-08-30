import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignUpdateOneMutation = mutationField(
  'updateOneAdvertCampaign',
  {
    type: nonNull('AdvertCampaign'),
    args: {
      where: nonNull('AdvertCampaignWhereUniqueInput'),
      data: nonNull('AdvertCampaignUpdateInput'),
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
