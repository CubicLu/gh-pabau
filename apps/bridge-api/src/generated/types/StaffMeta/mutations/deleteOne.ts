import { mutationField, nonNull } from 'nexus'

export const StaffMetaDeleteOneMutation = mutationField('deleteOneStaffMeta', {
  type: 'StaffMeta',
  args: {
    where: nonNull('StaffMetaWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.staffMeta.delete({
      where,
      ...select,
    })
  },
})
