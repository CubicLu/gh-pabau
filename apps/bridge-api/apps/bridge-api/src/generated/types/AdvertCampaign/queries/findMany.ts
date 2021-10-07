import { queryField, nonNull, list } from 'nexus'

export const AdvertCampaignFindManyQuery = queryField(
  'findManyAdvertCampaign',
  {
    type: nonNull(list(nonNull('AdvertCampaign'))),
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByWithRelationInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      distinct: 'AdvertCampaignScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.findMany({
        ...args,
        ...select,
      })
    },
  },
)
