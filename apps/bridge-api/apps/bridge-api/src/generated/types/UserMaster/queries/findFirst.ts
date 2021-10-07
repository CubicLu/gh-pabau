import { queryField, list } from 'nexus'

export const UserMasterFindFirstQuery = queryField('findFirstUserMaster', {
  type: 'UserMaster',
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    distinct: 'UserMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.findFirst({
      ...args,
      ...select,
    })
  },
})
