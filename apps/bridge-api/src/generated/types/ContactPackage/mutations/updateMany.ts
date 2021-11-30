import { mutationField, nonNull } from 'nexus'

export const ContactPackageUpdateManyMutation = mutationField(
  'updateManyContactPackage',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactPackageUpdateManyMutationInput'),
      where: 'ContactPackageWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPackage.updateMany(args as any)
    },
  },
)
