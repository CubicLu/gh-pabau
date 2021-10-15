import { queryField, nonNull, list } from 'nexus'

export const CmCampaignFindManyQuery = queryField('findManyCmCampaign', {
  type: nonNull(list(nonNull('CmCampaign'))),
  args: {
    where: 'CmCampaignWhereInput',
    orderBy: list('CmCampaignOrderByInput'),
    cursor: 'CmCampaignWhereUniqueInput',
    distinct: 'CmCampaignScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCampaign.findMany({
      ...args,
      ...select,
    })
  },
})
