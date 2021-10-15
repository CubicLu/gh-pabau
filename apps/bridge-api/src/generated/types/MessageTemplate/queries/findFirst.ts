import { queryField, list } from 'nexus'

export const MessageTemplateFindFirstQuery = queryField(
  'findFirstMessageTemplate',
  {
    type: 'MessageTemplate',
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      distinct: 'MessageTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
