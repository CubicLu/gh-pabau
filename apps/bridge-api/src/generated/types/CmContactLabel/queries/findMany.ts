import { queryField, nonNull, list } from 'nexus'

export const CmContactLabelFindManyQuery = queryField(
  'findManyCmContactLabel',
  {
    type: nonNull(list(nonNull('CmContactLabel'))),
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByWithRelationInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactLabelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.findMany({
        ...args,
        ...select,
      })
    },
  },
)
