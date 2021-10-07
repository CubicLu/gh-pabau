import { queryField, nonNull, list } from 'nexus'

export const MessageTemplateFindManyQuery = queryField(
  'findManyMessageTemplate',
  {
    type: nonNull(list(nonNull('MessageTemplate'))),
    args: {
      where: 'MessageTemplateWhereInput',
      orderBy: list('MessageTemplateOrderByWithRelationInput'),
      cursor: 'MessageTemplateWhereUniqueInput',
      distinct: 'MessageTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
