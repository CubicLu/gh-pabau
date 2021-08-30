import { queryField, nonNull, list } from 'nexus'

export const UserMasterFindManyQuery = queryField('findManyUserMaster', {
  type: nonNull(list(nonNull('UserMaster'))),
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByInput'),
    cursor: 'UserMasterWhereUniqueInput',
    distinct: 'UserMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.findMany({
      ...args,
      ...select,
    })
  },
})
