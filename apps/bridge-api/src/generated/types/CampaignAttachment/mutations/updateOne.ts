import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentUpdateOneMutation = mutationField(
  'updateOneCampaignAttachment',
  {
    type: nonNull('CampaignAttachment'),
    args: {
      where: nonNull('CampaignAttachmentWhereUniqueInput'),
      data: nonNull('CampaignAttachmentUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.campaignAttachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
