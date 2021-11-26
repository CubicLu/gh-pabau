import { queryField, nonNull, list } from 'nexus'

export const CmContactLocationFindManyQuery = queryField(
  'findManyCmContactLocation',
  {
    type: nonNull(list(nonNull('CmContactLocation'))),
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByWithRelationInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
