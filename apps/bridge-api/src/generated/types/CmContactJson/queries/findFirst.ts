import { queryField, list } from 'nexus'

export const CmContactJsonFindFirstQuery = queryField(
  'findFirstCmContactJson',
  {
    type: 'CmContactJson',
    args: {
      where: 'CmContactJsonWhereInput',
      orderBy: list('CmContactJsonOrderByInput'),
      cursor: 'CmContactJsonWhereUniqueInput',
      distinct: 'CmContactJsonScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactJson.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
