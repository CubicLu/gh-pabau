import { queryField, nonNull, list } from 'nexus'

export const CmContactLabelFindCountQuery = queryField(
  'findManyCmContactLabelCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByWithRelationInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactLabelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactLabel.count(args as any)
    },
  },
)
