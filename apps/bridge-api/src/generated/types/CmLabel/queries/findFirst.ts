import { queryField, list } from 'nexus'

export const CmLabelFindFirstQuery = queryField('findFirstCmLabel', {
  type: 'CmLabel',
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByInput'),
    cursor: 'CmLabelWhereUniqueInput',
    distinct: 'CmLabelScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLabel.findFirst({
      ...args,
      ...select,
    })
  },
})
