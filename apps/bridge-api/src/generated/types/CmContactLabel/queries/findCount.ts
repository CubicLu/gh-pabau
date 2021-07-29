import { queryField, nonNull, list } from 'nexus'

export const CmContactLabelFindCountQuery = queryField(
  'findManyCmContactLabelCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      distinct: 'CmContactLabelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactLabel.count(args as any)
    },
  },
)
