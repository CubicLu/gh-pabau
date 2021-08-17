import { mutationField, nonNull } from 'nexus'

export const MessageTemplateUpsertOneMutation = mutationField(
  'upsertOneMessageTemplate',
  {
    type: nonNull('MessageTemplate'),
    args: {
      where: nonNull('MessageTemplateWhereUniqueInput'),
      create: nonNull('MessageTemplateCreateInput'),
      update: nonNull('MessageTemplateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.messageTemplate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
