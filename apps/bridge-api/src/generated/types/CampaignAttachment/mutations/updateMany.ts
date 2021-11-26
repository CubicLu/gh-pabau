import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentUpdateManyMutation = mutationField(
  'updateManyCampaignAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CampaignAttachmentUpdateManyMutationInput'),
      where: 'CampaignAttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.campaignAttachment.updateMany(args as any)
    },
  },
)
