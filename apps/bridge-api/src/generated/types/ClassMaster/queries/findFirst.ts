import { queryField, list } from 'nexus'

export const ClassMasterFindFirstQuery = queryField('findFirstClassMaster', {
  type: 'ClassMaster',
  args: {
    where: 'ClassMasterWhereInput',
    orderBy: list('ClassMasterOrderByWithRelationInput'),
    cursor: 'ClassMasterWhereUniqueInput',
    distinct: 'ClassMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classMaster.findFirst({
      ...args,
      ...select,
    })
  },
})
