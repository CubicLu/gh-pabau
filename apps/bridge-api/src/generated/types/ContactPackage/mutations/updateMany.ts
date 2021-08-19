import { mutationField, nonNull } from 'nexus'

export const ContactPackageUpdateManyMutation = mutationField(
  'updateManyContactPackage',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ContactPackageWhereInput',
      data: nonNull('ContactPackageUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPackage.updateMany(args as any)
    },
  },
)
