import { mutationField, nonNull } from 'nexus'

export const ContactPackageDeleteOneMutation = mutationField(
  'deleteOneContactPackage',
  {
    type: 'ContactPackage',
    args: {
      where: nonNull('ContactPackageWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.contactPackage.delete({
        where,
        ...select,
      })
    },
  },
)
