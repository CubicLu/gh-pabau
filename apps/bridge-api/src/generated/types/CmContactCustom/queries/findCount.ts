import { queryField, nonNull, list } from 'nexus'

export const CmContactCustomFindCountQuery = queryField(
  'findManyCmContactCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByWithRelationInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactCustom.count(args as any)
    },
  },
)
