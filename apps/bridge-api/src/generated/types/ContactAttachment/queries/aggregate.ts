import { queryField, list } from 'nexus'

export const ContactAttachmentAggregateQuery = queryField(
  'aggregateContactAttachment',
  {
    type: 'AggregateContactAttachment',
    args: {
      where: 'ContactAttachmentWhereInput',
      orderBy: list('ContactAttachmentOrderByWithRelationInput'),
      cursor: 'ContactAttachmentWhereUniqueInput',
      distinct: 'ContactAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactAttachment.aggregate({ ...args, ...select }) as any
    },
  },
)
