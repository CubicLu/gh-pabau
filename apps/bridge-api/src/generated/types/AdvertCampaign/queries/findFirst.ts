import { queryField, list } from 'nexus'

export const AdvertCampaignFindFirstQuery = queryField(
  'findFirstAdvertCampaign',
  {
    type: 'AdvertCampaign',
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      distinct: 'AdvertCampaignScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
