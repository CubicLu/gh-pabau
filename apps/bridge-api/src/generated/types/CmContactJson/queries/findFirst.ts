import { queryField, list } from 'nexus'

export const CmContactJsonFindFirstQuery = queryField(
  'findFirstCmContactJson',
  {
    type: 'CmContactJson',
    args: {
      where: 'CmContactJsonWhereInput',
      orderBy: list('CmContactJsonOrderByWithRelationInput'),
      cursor: 'CmContactJsonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactJsonScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactJson.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
