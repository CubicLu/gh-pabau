import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteUpdateManyMutation = mutationField(
  'updateManyCmCampaignNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCampaignNoteUpdateManyMutationInput'),
      where: 'CmCampaignNoteWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaignNote.updateMany(args as any)
    },
  },
)
