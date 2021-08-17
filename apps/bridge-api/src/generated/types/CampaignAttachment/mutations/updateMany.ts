import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentUpdateManyMutation = mutationField(
  'updateManyCampaignAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CampaignAttachmentWhereInput',
      data: nonNull('CampaignAttachmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.campaignAttachment.updateMany(args as any)
    },
  },
)
