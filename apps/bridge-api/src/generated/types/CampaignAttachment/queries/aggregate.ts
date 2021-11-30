import { queryField, list } from 'nexus'

export const CampaignAttachmentAggregateQuery = queryField(
  'aggregateCampaignAttachment',
  {
    type: 'AggregateCampaignAttachment',
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByWithRelationInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.aggregate({ ...args, ...select }) as any
    },
  },
)
