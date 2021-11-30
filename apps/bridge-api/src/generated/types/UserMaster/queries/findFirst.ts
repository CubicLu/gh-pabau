import { queryField, list } from 'nexus'

export const UserMasterFindFirstQuery = queryField('findFirstUserMaster', {
  type: 'UserMaster',
  args: {
    where: 'UserMasterWhereInput',
    orderBy: list('UserMasterOrderByWithRelationInput'),
    cursor: 'UserMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userMaster.findFirst({
      ...args,
      ...select,
    })
  },
})
