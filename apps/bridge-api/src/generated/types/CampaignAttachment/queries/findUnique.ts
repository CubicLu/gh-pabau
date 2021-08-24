import { queryField, nonNull } from 'nexus'

export const CampaignAttachmentFindUniqueQuery = queryField(
  'findUniqueCampaignAttachment',
  {
    type: 'CampaignAttachment',
    args: {
      where: nonNull('CampaignAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.campaignAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)
