import { queryField, list } from 'nexus'

export const StaffMetaFindFirstQuery = queryField('findFirstStaffMeta', {
  type: 'StaffMeta',
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
