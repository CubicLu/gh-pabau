import { queryField, list } from 'nexus'

export const CmContactLocationFindFirstQuery = queryField(
  'findFirstCmContactLocation',
  {
    type: 'CmContactLocation',
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByWithRelationInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
