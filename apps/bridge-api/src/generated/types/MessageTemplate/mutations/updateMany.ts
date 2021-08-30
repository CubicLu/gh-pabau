import { mutationField, nonNull } from 'nexus'

export const MessageTemplateUpdateManyMutation = mutationField(
  'updateManyMessageTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MessageTemplateWhereInput',
      data: nonNull('MessageTemplateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.messageTemplate.updateMany(args as any)
    },
  },
)
