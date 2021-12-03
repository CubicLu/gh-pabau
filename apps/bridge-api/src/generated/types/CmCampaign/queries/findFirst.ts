import { queryField, list } from 'nexus'

export const CmCampaignFindFirstQuery = queryField('findFirstCmCampaign', {
  type: 'CmCampaign',
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByWithRelationInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCampaignScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCampaign.findFirst({
      ...args,
      ...select,
    })
  },
})
