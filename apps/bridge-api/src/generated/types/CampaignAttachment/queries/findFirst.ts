import { queryField, list } from 'nexus'

export const CampaignAttachmentFindFirstQuery = queryField(
  'findFirstCampaignAttachment',
  {
    type: 'CampaignAttachment',
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByWithRelationInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CampaignAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
