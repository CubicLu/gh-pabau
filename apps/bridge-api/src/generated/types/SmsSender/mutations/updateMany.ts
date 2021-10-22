import { mutationField, nonNull } from 'nexus'

export const SmsSenderUpdateManyMutation = mutationField(
  'updateManySmsSender',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SmsSenderWhereInput',
      data: nonNull('SmsSenderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsSender.updateMany(args as any)
    },
  },
)
