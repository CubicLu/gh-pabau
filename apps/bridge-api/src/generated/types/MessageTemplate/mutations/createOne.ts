import { mutationField, nonNull } from 'nexus'

export const MessageTemplateCreateOneMutation = mutationField(
  'createOneMessageTemplate',
  {
    type: nonNull('MessageTemplate'),
    args: {
      data: nonNull('MessageTemplateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.messageTemplate.create({
        data,
        ...select,
      })
    },
  },
)
