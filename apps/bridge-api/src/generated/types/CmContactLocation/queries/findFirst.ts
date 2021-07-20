import { queryField, list } from 'nexus'

export const CmContactLocationFindFirstQuery = queryField(
  'findFirstCmContactLocation',
  {
    type: 'CmContactLocation',
    args: {
      where: 'CmContactLocationWhereInput',
      orderBy: list('CmContactLocationOrderByInput'),
      cursor: 'CmContactLocationWhereUniqueInput',
      distinct: 'CmContactLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
