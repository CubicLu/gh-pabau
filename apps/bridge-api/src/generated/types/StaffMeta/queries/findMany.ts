import { queryField, nonNull, list } from 'nexus'

export const StaffMetaFindManyQuery = queryField('findManyStaffMeta', {
  type: nonNull(list(nonNull('StaffMeta'))),
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    distinct: 'StaffMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.findMany({
      ...args,
      ...select,
    })
  },
})
