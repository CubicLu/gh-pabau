import { queryField, nonNull, list } from 'nexus'

export const CampaignAttachmentFindCountQuery = queryField(
  'findManyCampaignAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByWithRelationInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CampaignAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.campaignAttachment.count(args as any)
    },
  },
)
