import { queryField, list } from 'nexus'

export const AdvertCampaignAggregateQuery = queryField(
  'aggregateAdvertCampaign',
  {
    type: 'AggregateAdvertCampaign',
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByWithRelationInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      distinct: 'AdvertCampaignScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.aggregate({ ...args, ...select }) as any
    },
  },
)
