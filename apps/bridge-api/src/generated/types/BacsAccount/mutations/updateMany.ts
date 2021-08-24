import { mutationField, nonNull } from 'nexus'

export const BacsAccountUpdateManyMutation = mutationField(
  'updateManyBacsAccount',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BacsAccountWhereInput',
      data: nonNull('BacsAccountUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bacsAccount.updateMany(args as any)
    },
  },
)
