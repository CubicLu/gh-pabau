import { queryField, nonNull, list } from 'nexus'

export const StaffMetaFindCountQuery = queryField('findManyStaffMetaCount', {
  type: nonNull('Int'),
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    distinct: 'StaffMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.staffMeta.count(args as any)
  },
})
