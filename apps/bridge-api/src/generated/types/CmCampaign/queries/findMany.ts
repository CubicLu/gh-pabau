import { queryField, nonNull, list } from 'nexus'

export const CmCampaignFindManyQuery = queryField('findManyCmCampaign', {
  type: nonNull(list(nonNull('CmCampaign'))),
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByWithRelationInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCampaignScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCampaign.findMany({
      ...args,
      ...select,
    })
  },
})
