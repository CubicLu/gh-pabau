import { queryField, nonNull } from 'nexus'

export const MessageTemplateFindUniqueQuery = queryField(
  'findUniqueMessageTemplate',
  {
    type: 'MessageTemplate',
    args: {
      where: nonNull('MessageTemplateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.messageTemplate.findUnique({
        where,
        ...select,
      })
    },
  },
)
