import { queryField, nonNull, list } from 'nexus'

export const ClasstypeMasterFindCountQuery = queryField(
  'findManyClasstypeMasterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClasstypeMasterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classtypeMaster.count(args as any)
    },
  },
)
