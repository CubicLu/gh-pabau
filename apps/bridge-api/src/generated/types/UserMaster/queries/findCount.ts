import { queryField, nonNull, list } from 'nexus'

export const UserMasterFindCountQuery = queryField('findManyUserMasterCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    distinct: 'UserMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userMaster.count(args as any)
  },
})
