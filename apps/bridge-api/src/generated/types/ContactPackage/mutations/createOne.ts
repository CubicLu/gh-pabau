import { mutationField, nonNull } from 'nexus'

export const ContactPackageCreateOneMutation = mutationField(
  'createOneContactPackage',
  {
    type: nonNull('ContactPackage'),
    args: {
      data: nonNull('ContactPackageCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.contactPackage.create({
        data,
        ...select,
      })
    },
  },
)
