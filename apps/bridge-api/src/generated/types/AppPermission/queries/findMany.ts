import { queryField, nonNull, list } from 'nexus'

export const AppPermissionFindManyQuery = queryField('findManyAppPermission', {
  type: nonNull(list(nonNull('AppPermission'))),
  args: {
    where: 'AppPermissionWhereInput',
    orderBy: list('AppPermissionOrderByWithRelationInput'),
    cursor: 'AppPermissionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AppPermissionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.appPermission.findMany({
      ...args,
      ...select,
    })
  },
})
