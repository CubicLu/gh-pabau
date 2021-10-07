import { queryField, list } from 'nexus'

export const CmContactFindFirstQuery = queryField('findFirstCmContact', {
  type: 'CmContact',
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByWithRelationInput'),
    cursor: 'CmContactWhereUniqueInput',
    distinct: 'CmContactScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContact.findFirst({
      ...args,
      ...select,
    })
  },
})
