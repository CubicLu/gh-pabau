import { queryField, list } from 'nexus'

export const ClassMasterFindFirstQuery = queryField('findFirstClassMaster', {
  type: 'ClassMaster',
  args: {
    where: 'ClassMasterWhereInput',
    orderBy: list('ClassMasterOrderByWithRelationInput'),
    cursor: 'ClassMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classMaster.findFirst({
      ...args,
      ...select,
    })
  },
})
