import { queryField, nonNull, list } from 'nexus'

export const CmCampaignFindCountQuery = queryField('findManyCmCampaignCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    distinct: 'CmCampaignScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCampaign.count(args as any)
  },
})
