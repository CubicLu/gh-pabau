import { queryField, nonNull, list } from 'nexus'

export const CmContactLabelFindManyQuery = queryField(
  'findManyCmContactLabel',
  {
    type: nonNull(list(nonNull('CmContactLabel'))),
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByWithRelationInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      distinct: 'CmContactLabelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.findMany({
        ...args,
        ...select,
      })
    },
  },
)
