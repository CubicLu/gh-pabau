import { mutationField, nonNull } from 'nexus'

export const SessionPackageUpsertOneMutation = mutationField(
  'upsertOneSessionPackage',
  {
    type: nonNull('SessionPackage'),
    args: {
      where: nonNull('SessionPackageWhereUniqueInput'),
      create: nonNull('SessionPackageCreateInput'),
      update: nonNull('SessionPackageUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.sessionPackage.upsert({
        ...args,
        ...select,
      })
    },
  },
)
