import { queryField, list } from 'nexus'

export const CmLabelFindFirstQuery = queryField('findFirstCmLabel', {
  type: 'CmLabel',
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByWithRelationInput'),
    cursor: 'CmLabelWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLabelScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLabel.findFirst({
      ...args,
      ...select,
    })
  },
})
