import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteUpdateOneMutation = mutationField(
  'updateOneCmCampaignNote',
  {
    type: nonNull('CmCampaignNote'),
    args: {
      data: nonNull('CmCampaignNoteUpdateInput'),
      where: nonNull('CmCampaignNoteWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCampaignNote.update({
        where,
        data,
        ...select,
      })
    },
  },
)
