import { queryField, nonNull } from 'nexus'

export const StaffMetaFindUniqueQuery = queryField('findUniqueStaffMeta', {
  type: 'StaffMeta',
  args: {
    where: nonNull('StaffMetaWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.staffMeta.findUnique({
      where,
      ...select,
    })
  },
})
