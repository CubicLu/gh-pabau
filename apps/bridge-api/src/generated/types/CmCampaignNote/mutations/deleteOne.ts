import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteDeleteOneMutation = mutationField(
  'deleteOneCmCampaignNote',
  {
    type: 'CmCampaignNote',
    args: {
      where: nonNull('CmCampaignNoteWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmCampaignNote.delete({
        where,
        ...select,
      })
    },
  },
)
