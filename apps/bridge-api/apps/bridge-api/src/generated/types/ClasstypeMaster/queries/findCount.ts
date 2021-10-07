import { queryField, nonNull, list } from 'nexus'

export const ClasstypeMasterFindCountQuery = queryField(
  'findManyClasstypeMasterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      distinct: 'ClasstypeMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classtypeMaster.count(args as any)
    },
  },
)
