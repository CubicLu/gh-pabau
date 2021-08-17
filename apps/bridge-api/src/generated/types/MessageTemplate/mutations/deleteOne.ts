import { mutationField, nonNull } from 'nexus'

export const MessageTemplateDeleteOneMutation = mutationField(
  'deleteOneMessageTemplate',
  {
    type: 'MessageTemplate',
    args: {
      where: nonNull('MessageTemplateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.messageTemplate.delete({
        where,
        ...select,
      })
    },
  },
)
