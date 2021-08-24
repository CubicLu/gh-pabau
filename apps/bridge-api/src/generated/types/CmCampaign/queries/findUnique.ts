import { queryField, nonNull } from 'nexus'

export const CmCampaignFindUniqueQuery = queryField('findUniqueCmCampaign', {
  type: 'CmCampaign',
  args: {
    where: nonNull('CmCampaignWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmCampaign.findUnique({
      where,
      ...select,
    })
  },
})
