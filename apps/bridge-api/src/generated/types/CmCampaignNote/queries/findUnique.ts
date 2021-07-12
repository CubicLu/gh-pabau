import { queryField, nonNull } from 'nexus'

export const CmCampaignNoteFindUniqueQuery = queryField(
  'findUniqueCmCampaignNote',
  {
    type: 'CmCampaignNote',
    args: {
      where: nonNull('CmCampaignNoteWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmCampaignNote.findUnique({
        where,
        ...select,
      })
    },
  },
)
