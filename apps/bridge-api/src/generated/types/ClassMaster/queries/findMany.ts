import { queryField, nonNull, list } from 'nexus'

export const ClassMasterFindManyQuery = queryField('findManyClassMaster', {
  type: nonNull(list(nonNull('ClassMaster'))),
  args: {
    where: 'ClassMasterWhereInput',
    orderBy: list('ClassMasterOrderByWithRelationInput'),
    cursor: 'ClassMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassMasterScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classMaster.findMany({
      ...args,
      ...select,
    })
  },
})
