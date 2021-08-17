import { queryField, nonNull } from 'nexus'

export const UserMasterFindUniqueQuery = queryField('findUniqueUserMaster', {
  type: 'UserMaster',
  args: {
    where: nonNull('UserMasterWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.userMaster.findUnique({
      where,
      ...select,
    })
  },
})
