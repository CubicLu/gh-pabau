import { queryField, list } from 'nexus'

export const CmCampaignFindFirstQuery = queryField('findFirstCmCampaign', {
  type: 'CmCampaign',
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    distinct: 'CmCampaignScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCampaign.findFirst({
      ...args,
      ...select,
    })
  },
})
