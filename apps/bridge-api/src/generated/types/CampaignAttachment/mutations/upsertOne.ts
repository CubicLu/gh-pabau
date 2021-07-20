import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentUpsertOneMutation = mutationField(
  'upsertOneCampaignAttachment',
  {
    type: nonNull('CampaignAttachment'),
    args: {
      where: nonNull('CampaignAttachmentWhereUniqueInput'),
      create: nonNull('CampaignAttachmentCreateInput'),
      update: nonNull('CampaignAttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
