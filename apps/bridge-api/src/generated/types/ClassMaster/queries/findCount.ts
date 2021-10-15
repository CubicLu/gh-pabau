import { queryField, nonNull, list } from 'nexus'

export const ClassMasterFindCountQuery = queryField(
  'findManyClassMasterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassMasterWhereInput',
      orderBy: list('ClassMasterOrderByInput'),
      cursor: 'ClassMasterWhereUniqueInput',
      distinct: 'ClassMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classMaster.count(args as any)
    },
  },
)
