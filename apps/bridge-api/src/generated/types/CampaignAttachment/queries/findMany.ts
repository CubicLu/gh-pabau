import { queryField, nonNull, list } from 'nexus'

export const CampaignAttachmentFindManyQuery = queryField(
  'findManyCampaignAttachment',
  {
    type: nonNull(list(nonNull('CampaignAttachment'))),
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByWithRelationInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CampaignAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
