import { mutationField, nonNull } from 'nexus'

export const CampaignAttachmentUpdateOneMutation = mutationField(
  'updateOneCampaignAttachment',
  {
    type: nonNull('CampaignAttachment'),
    args: {
      data: nonNull('CampaignAttachmentUpdateInput'),
      where: nonNull('CampaignAttachmentWhereUniqueInput'),
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
