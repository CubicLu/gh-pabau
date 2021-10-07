import { queryField, list } from 'nexus'

export const CampaignAttachmentFindFirstQuery = queryField(
  'findFirstCampaignAttachment',
  {
    type: 'CampaignAttachment',
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByWithRelationInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      distinct: 'CampaignAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
