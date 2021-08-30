import { queryField, list } from 'nexus'

export const CmContactLabelFindFirstQuery = queryField(
  'findFirstCmContactLabel',
  {
    type: 'CmContactLabel',
    args: {
      where: 'CmContactLabelWhereInput',
      orderBy: list('CmContactLabelOrderByInput'),
      cursor: 'CmContactLabelWhereUniqueInput',
      distinct: 'CmContactLabelScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
