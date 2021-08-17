import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteCreateOneMutation = mutationField(
  'createOneCmCampaignNote',
  {
    type: nonNull('CmCampaignNote'),
    args: {
      data: nonNull('CmCampaignNoteCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmCampaignNote.create({
        data,
        ...select,
      })
    },
  },
)
