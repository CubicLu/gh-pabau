import { queryField, list } from 'nexus'

export const CmContactLabelFindFirstQuery = queryField(
  'findFirstCmContactLabel',
  {
    type: 'CmContactLabel',
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByWithRelationInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactLabelScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
