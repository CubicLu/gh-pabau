import { queryField, list } from 'nexus'

export const StaffMetaFindFirstQuery = queryField('findFirstStaffMeta', {
  type: 'StaffMeta',
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    distinct: 'StaffMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
