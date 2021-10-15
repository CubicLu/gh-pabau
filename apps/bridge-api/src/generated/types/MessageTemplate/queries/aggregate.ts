import { queryField, list } from 'nexus'

export const MessageTemplateAggregateQuery = queryField(
  'aggregateMessageTemplate',
  {
    type: 'AggregateMessageTemplate',
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      distinct: 'MessageTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
