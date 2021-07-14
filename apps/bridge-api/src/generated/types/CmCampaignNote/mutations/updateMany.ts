import { mutationField, nonNull } from 'nexus'

export const CmCampaignNoteUpdateManyMutation = mutationField(
  'updateManyCmCampaignNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCampaignNoteWhereInput',
      data: nonNull('CmCampaignNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaignNote.updateMany(args as any)
    },
  },
)
