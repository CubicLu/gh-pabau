import { queryField, nonNull, list } from 'nexus'

export const ClassMasterFindCountQuery = queryField(
  'findManyClassMasterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassMasterWhereInput',
      orderBy: list('ClassMasterOrderByWithRelationInput'),
      cursor: 'ClassMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassMasterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classMaster.count(args as any)
    },
  },
)
