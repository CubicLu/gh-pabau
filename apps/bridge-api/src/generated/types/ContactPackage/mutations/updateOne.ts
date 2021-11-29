import { mutationField, nonNull } from 'nexus'

export const ContactPackageUpdateOneMutation = mutationField(
  'updateOneContactPackage',
  {
    type: nonNull('ContactPackage'),
    args: {
      data: nonNull('ContactPackageUpdateInput'),
      where: nonNull('ContactPackageWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactPackage.update({
        where,
        data,
        ...select,
      })
    },
  },
)
