import { queryField, nonNull, list } from 'nexus'

export const MessageTemplateFindCountQuery = queryField(
  'findManyMessageTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      distinct: 'MessageTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.messageTemplate.count(args as any)
    },
  },
)
