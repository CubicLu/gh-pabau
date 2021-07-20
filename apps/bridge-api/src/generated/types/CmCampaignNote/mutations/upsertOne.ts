import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteUpsertOneMutation = mutationField(
  'upsertOneCmCampaignNote',
  {
    type: nonNull('CmCampaignNote'),
    args: {
      where: nonNull('CmCampaignNoteWhereUniqueInput'),
      create: nonNull('CmCampaignNoteCreateInput'),
      update: nonNull('CmCampaignNoteUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaignNote.upsert({
        ...args,
        ...select,
      })
    },
  },
)
