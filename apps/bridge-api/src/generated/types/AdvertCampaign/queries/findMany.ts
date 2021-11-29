import { queryField, nonNull, list } from 'nexus'

export const AdvertCampaignFindManyQuery = queryField(
  'findManyAdvertCampaign',
  {
    type: nonNull(list(nonNull('AdvertCampaign'))),
    args: {
      where: 'AdvertCampaignWhereInput',
      orderBy: list('AdvertCampaignOrderByWithRelationInput'),
      cursor: 'AdvertCampaignWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AdvertCampaignScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.advertCampaign.findMany({
        ...args,
        ...select,
      })
    },
  },
)
