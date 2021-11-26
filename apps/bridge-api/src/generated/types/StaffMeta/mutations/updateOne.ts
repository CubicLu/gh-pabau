import { mutationField, nonNull } from 'nexus'

export const StaffMetaUpdateOneMutation = mutationField('updateOneStaffMeta', {
  type: nonNull('StaffMeta'),
  args: {
    data: nonNull('StaffMetaUpdateInput'),
    where: nonNull('StaffMetaWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.staffMeta.update({
      where,
      data,
      ...select,
    })
  },
})
