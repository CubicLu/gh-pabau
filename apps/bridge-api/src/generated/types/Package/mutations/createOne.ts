import { mutationField, nonNull } from 'nexus'

export const PackageCreateOneMutation = mutationField('createOnePackage', {
  type: nonNull('Package'),
  args: {
    data: nonNull('PackageCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.package.create({
      data,
      ...select,
    })
  },
})
