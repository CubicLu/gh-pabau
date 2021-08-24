import { mutationField, nonNull } from 'nexus'

export const MessageTemplateUpdateOneMutation = mutationField(
  'updateOneMessageTemplate',
  {
    type: nonNull('MessageTemplate'),
    args: {
      where: nonNull('MessageTemplateWhereUniqueInput'),
      data: nonNull('MessageTemplateUpdateInput'),
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
