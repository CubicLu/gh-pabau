import { mutationField, nonNull } from 'nexus'

export const CmCampaignDeleteOneMutation = mutationField(
  'deleteOneCmCampaign',
  {
    type: 'CmCampaign',
    args: {
      where: nonNull('CmCampaignWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCampaign.delete({
        where,
        ...select,
      })
    },
  },
)
