import { mutationField, nonNull } from 'nexus'

export const MessageTemplateUpdateManyMutation = mutationField(
  'updateManyMessageTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MessageTemplateUpdateManyMutationInput'),
      where: 'MessageTemplateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.messageTemplate.updateMany(args as any)
    },
  },
)
