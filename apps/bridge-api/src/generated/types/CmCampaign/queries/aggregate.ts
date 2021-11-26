import { queryField, list } from 'nexus'

export const CmCampaignAggregateQuery = queryField('aggregateCmCampaign', {
  type: 'AggregateCmCampaign',
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByWithRelationInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCampaign.aggregate({ ...args, ...select }) as any
  },
})
