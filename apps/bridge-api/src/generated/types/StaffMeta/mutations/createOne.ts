import { mutationField, nonNull } from 'nexus'

export const StaffMetaCreateOneMutation = mutationField('createOneStaffMeta', {
  type: nonNull('StaffMeta'),
  args: {
    data: nonNull('StaffMetaCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.staffMeta.create({
      data,
      ...select,
    })
  },
})
