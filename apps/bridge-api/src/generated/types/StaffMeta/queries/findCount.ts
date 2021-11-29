import { queryField, nonNull, list } from 'nexus'

export const StaffMetaFindCountQuery = queryField('findManyStaffMetaCount', {
  type: nonNull('Int'),
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('StaffMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.staffMeta.count(args as any)
  },
})
