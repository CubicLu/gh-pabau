import { queryField, nonNull, list } from 'nexus'

export const UserMasterFindCountQuery = queryField('findManyUserMasterCount', {
  type: nonNull('Int'),
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.userMaster.count(args as any)
  },
})
