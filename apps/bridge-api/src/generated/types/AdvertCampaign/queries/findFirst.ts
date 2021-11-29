import { queryField, list } from 'nexus'

export const AdvertCampaignFindFirstQuery = queryField(
  'findFirstAdvertCampaign',
  {
    type: 'AdvertCampaign',
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByWithRelationInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AdvertCampaignScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
