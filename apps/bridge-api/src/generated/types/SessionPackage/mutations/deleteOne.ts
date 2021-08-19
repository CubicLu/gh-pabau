import { mutationField, nonNull } from 'nexus'

export const SessionPackageDeleteOneMutation = mutationField(
  'deleteOneSessionPackage',
  {
    type: 'SessionPackage',
    args: {
      where: nonNull('SessionPackageWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.sessionPackage.delete({
        where,
        ...select,
      })
    },
  },
)
