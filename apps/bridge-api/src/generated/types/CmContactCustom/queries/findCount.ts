import { queryField, nonNull, list } from 'nexus'

export const CmContactCustomFindCountQuery = queryField(
  'findManyCmContactCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      distinct: 'CmContactCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactCustom.count(args as any)
    },
  },
)
