import { mutationField, nonNull } from 'nexus'

export const PackageUsedCreateOneMutation = mutationField(
  'createOnePackageUsed',
  {
    type: nonNull('PackageUsed'),
    args: {
      data: nonNull('PackageUsedCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.packageUsed.create({
        data,
        ...select,
      })
    },
  },
)
