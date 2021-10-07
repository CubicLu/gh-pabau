import { queryField, nonNull, list } from 'nexus'

export const ClasstypeMasterFindManyQuery = queryField(
  'findManyClasstypeMaster',
  {
    type: nonNull(list(nonNull('ClasstypeMaster'))),
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      distinct: 'ClasstypeMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.findMany({
        ...args,
        ...select,
      })
    },
  },
)
