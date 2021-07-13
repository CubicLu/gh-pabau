import { mutationField, nonNull } from 'nexus'

export const StaffMetaUpdateOneMutation = mutationField('updateOneStaffMeta', {
  type: nonNull('StaffMeta'),
  args: {
    where: nonNull('StaffMetaWhereUniqueInput'),
    data: nonNull('StaffMetaUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.staffMeta.update({
      where,
      data,
      ...select,
    })
  },
})
