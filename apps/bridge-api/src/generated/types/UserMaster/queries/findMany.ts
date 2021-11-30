import { queryField, nonNull, list } from 'nexus'

export const UserMasterFindManyQuery = queryField('findManyUserMaster', {
  type: nonNull(list(nonNull('UserMaster'))),
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.findMany({
      ...args,
      ...select,
    })
  },
})
