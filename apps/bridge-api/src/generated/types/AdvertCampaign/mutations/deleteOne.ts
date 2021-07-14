import { mutationField, nonNull } from 'nexus'

export const AdvertCampaignDeleteOneMutation = mutationField(
  'deleteOneAdvertCampaign',
  {
    type: 'AdvertCampaign',
    args: {
      where: nonNull('AdvertCampaignWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.advertCampaign.delete({
        where,
        ...select,
      })
    },
  },
)
