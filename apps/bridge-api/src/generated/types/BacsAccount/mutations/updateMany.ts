import { mutationField, nonNull } from 'nexus'

export const BacsAccountUpdateManyMutation = mutationField(
  'updateManyBacsAccount',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BacsAccountUpdateManyMutationInput'),
      where: 'BacsAccountWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bacsAccount.updateMany(args as any)
    },
  },
)
