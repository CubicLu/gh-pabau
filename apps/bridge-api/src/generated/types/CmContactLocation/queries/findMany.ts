import { queryField, nonNull, list } from 'nexus'

export const CmContactLocationFindManyQuery = queryField(
  'findManyCmContactLocation',
  {
    type: nonNull(list(nonNull('CmContactLocation'))),
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByWithRelationInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      distinct: 'CmContactLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
