import { queryField, nonNull, list } from 'nexus'

export const CmContactCustomFindManyQuery = queryField(
  'findManyCmContactCustom',
  {
    type: nonNull(list(nonNull('CmContactCustom'))),
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      distinct: 'CmContactCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.findMany({
        ...args,
        ...select,
      })
    },
  },
)
