import { queryField, list } from 'nexus'

export const MessageTemplateFindFirstQuery = queryField(
  'findFirstMessageTemplate',
  {
    type: 'MessageTemplate',
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByWithRelationInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MessageTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
