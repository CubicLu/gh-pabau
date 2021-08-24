import { mutationField, nonNull } from 'nexus'

export const StaffMetaUpsertOneMutation = mutationField('upsertOneStaffMeta', {
  type: nonNull('StaffMeta'),
  args: {
    where: nonNull('StaffMetaWhereUniqueInput'),
    create: nonNull('StaffMetaCreateInput'),
    update: nonNull('StaffMetaUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.upsert({
      ...args,
      ...select,
    })
  },
})
