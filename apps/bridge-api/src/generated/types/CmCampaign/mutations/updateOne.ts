import { mutationField, nonNull } from 'nexus'

export const CmCampaignUpdateOneMutation = mutationField(
  'updateOneCmCampaign',
  {
    type: nonNull('CmCampaign'),
    args: {
      where: nonNull('CmCampaignWhereUniqueInput'),
      data: nonNull('CmCampaignUpdateInput'),
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
