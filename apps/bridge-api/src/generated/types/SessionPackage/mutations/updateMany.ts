import { mutationField, nonNull } from 'nexus'

export const SessionPackageUpdateManyMutation = mutationField(
  'updateManySessionPackage',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SessionPackageWhereInput',
      data: nonNull('SessionPackageUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.sessionPackage.updateMany(args as any)
    },
  },
)
