import { queryField, nonNull, list } from 'nexus'

export const CmLabelFindManyQuery = queryField('findManyCmLabel', {
  type: nonNull(list(nonNull('CmLabel'))),
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByWithRelationInput'),
    cursor: 'CmLabelWhereUniqueInput',
    distinct: 'CmLabelScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLabel.findMany({
      ...args,
      ...select,
    })
  },
})
