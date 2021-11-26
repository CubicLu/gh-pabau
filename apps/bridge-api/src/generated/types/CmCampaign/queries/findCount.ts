import { queryField, nonNull, list } from 'nexus'

export const CmCampaignFindCountQuery = queryField('findManyCmCampaignCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByWithRelationInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCampaignScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCampaign.count(args as any)
  },
})
