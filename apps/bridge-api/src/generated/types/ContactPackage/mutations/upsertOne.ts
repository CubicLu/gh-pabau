import { mutationField, nonNull } from 'nexus'

export const ContactPackageUpsertOneMutation = mutationField(
  'upsertOneContactPackage',
  {
    type: nonNull('ContactPackage'),
    args: {
      where: nonNull('ContactPackageWhereUniqueInput'),
      create: nonNull('ContactPackageCreateInput'),
      update: nonNull('ContactPackageUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.upsert({
        ...args,
        ...select,
      })
    },
  },
)
