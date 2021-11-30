import { queryField, list } from 'nexus'

export const MessageTemplateAggregateQuery = queryField(
  'aggregateMessageTemplate',
  {
    type: 'AggregateMessageTemplate',
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByWithRelationInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
