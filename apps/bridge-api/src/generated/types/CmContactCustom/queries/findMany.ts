import { queryField, nonNull, list } from 'nexus'

export const CmContactCustomFindManyQuery = queryField(
  'findManyCmContactCustom',
  {
    type: nonNull(list(nonNull('CmContactCustom'))),
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByWithRelationInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.findMany({
        ...args,
        ...select,
      })
    },
  },
)
