import { queryField, nonNull, list } from 'nexus'

export const StaffMetaFindManyQuery = queryField('findManyStaffMeta', {
  type: nonNull(list(nonNull('StaffMeta'))),
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.findMany({
      ...args,
      ...select,
    })
  },
})
