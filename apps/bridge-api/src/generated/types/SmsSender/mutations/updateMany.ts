import { mutationField, nonNull } from 'nexus'

export const SmsSenderUpdateManyMutation = mutationField(
  'updateManySmsSender',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SmsSenderUpdateManyMutationInput'),
      where: 'SmsSenderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.smsSender.updateMany(args as any)
    },
  },
)
