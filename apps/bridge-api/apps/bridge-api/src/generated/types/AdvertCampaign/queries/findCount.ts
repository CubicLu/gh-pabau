import { queryField, nonNull, list } from 'nexus'

export const AdvertCampaignFindCountQuery = queryField(
  'findManyAdvertCampaignCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByWithRelationInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      distinct: 'AdvertCampaignScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.advertCampaign.count(args as any)
    },
  },
)
