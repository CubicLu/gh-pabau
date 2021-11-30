import { queryField, nonNull, list } from 'nexus'

export const MessageTemplateFindCountQuery = queryField(
  'findManyMessageTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByWithRelationInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MessageTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.messageTemplate.count(args as any)
    },
  },
)
