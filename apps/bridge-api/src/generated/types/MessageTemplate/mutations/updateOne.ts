import { mutationField, nonNull } from 'nexus'

export const MessageTemplateUpdateOneMutation = mutationField(
  'updateOneMessageTemplate',
  {
    type: nonNull('MessageTemplate'),
    args: {
      data: nonNull('MessageTemplateUpdateInput'),
      where: nonNull('MessageTemplateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.messageTemplate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
