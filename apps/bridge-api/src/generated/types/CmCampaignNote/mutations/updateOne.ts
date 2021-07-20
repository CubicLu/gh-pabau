import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteUpdateOneMutation = mutationField(
  'updateOneCmCampaignNote',
  {
    type: nonNull('CmCampaignNote'),
    args: {
      where: nonNull('CmCampaignNoteWhereUniqueInput'),
      data: nonNull('CmCampaignNoteUpdateInput'),
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
