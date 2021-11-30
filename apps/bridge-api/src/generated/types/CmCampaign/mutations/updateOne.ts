import { mutationField, nonNull } from 'nexus'

export const CmCampaignUpdateOneMutation = mutationField(
  'updateOneCmCampaign',
  {
    type: nonNull('CmCampaign'),
    args: {
      data: nonNull('CmCampaignUpdateInput'),
      where: nonNull('CmCampaignWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCampaign.update({
        where,
        data,
        ...select,
      })
    },
  },
)
