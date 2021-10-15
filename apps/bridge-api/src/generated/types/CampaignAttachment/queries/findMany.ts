import { queryField, nonNull, list } from 'nexus'

export const CampaignAttachmentFindManyQuery = queryField(
  'findManyCampaignAttachment',
  {
    type: nonNull(list(nonNull('CampaignAttachment'))),
    args: {
      where: 'CampaignAttachmentWhereInput',
      orderBy: list('CampaignAttachmentOrderByInput'),
      cursor: 'CampaignAttachmentWhereUniqueInput',
      distinct: 'CampaignAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.campaignAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
