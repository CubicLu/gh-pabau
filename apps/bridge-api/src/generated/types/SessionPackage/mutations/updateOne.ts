import { mutationField, nonNull } from 'nexus'

export const SessionPackageUpdateOneMutation = mutationField(
  'updateOneSessionPackage',
  {
    type: nonNull('SessionPackage'),
    args: {
      where: nonNull('SessionPackageWhereUniqueInput'),
      data: nonNull('SessionPackageUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.sessionPackage.update({
        where,
        data,
        ...select,
      })
    },
  },
)
