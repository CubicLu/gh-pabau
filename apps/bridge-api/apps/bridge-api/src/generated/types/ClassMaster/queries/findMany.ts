import { queryField, nonNull, list } from 'nexus'

export const ClassMasterFindManyQuery = queryField('findManyClassMaster', {
  type: nonNull(list(nonNull('ClassMaster'))),
  args: {
    where: 'ClassMasterWhereInput',
    orderBy: list('ClassMasterOrderByWithRelationInput'),
    cursor: 'ClassMasterWhereUniqueInput',
    distinct: 'ClassMasterScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classMaster.findMany({
      ...args,
      ...select,
    })
  },
})
