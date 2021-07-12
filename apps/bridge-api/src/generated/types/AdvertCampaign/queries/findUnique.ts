import { queryField, nonNull } from 'nexus'

export const AdvertCampaignFindUniqueQuery = queryField(
  'findUniqueAdvertCampaign',
  {
    type: 'AdvertCampaign',
    args: {
      where: nonNull('AdvertCampaignWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.advertCampaign.findUnique({
        where,
        ...select,
      })
    },
  },
)
