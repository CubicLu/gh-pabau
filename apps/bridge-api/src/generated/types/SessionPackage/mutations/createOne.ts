import { mutationField, nonNull } from 'nexus'

export const SessionPackageCreateOneMutation = mutationField(
  'createOneSessionPackage',
  {
    type: nonNull('SessionPackage'),
    args: {
      data: nonNull('SessionPackageCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.sessionPackage.create({
        data,
        ...select,
      })
    },
  },
)
