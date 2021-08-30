import { queryField, nonNull, list } from 'nexus'

export const AppPermissionFindManyQuery = queryField('findManyAppPermission', {
  type: nonNull(list(nonNull('AppPermission'))),
  args: {
    where: 'AppPermissionWhereInput',
    orderBy: list('AppPermissionOrderByInput'),
    cursor: 'AppPermissionWhereUniqueInput',
    distinct: 'AppPermissionScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.appPermission.findMany({
      ...args,
      ...select,
    })
  },
})
