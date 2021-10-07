import { queryField, nonNull, list } from 'nexus'

export const CmContactFindManyQuery = queryField('findManyCmContact', {
  type: nonNull(list(nonNull('CmContact'))),
  args: {
    where: 'CmContactWhereInput',
    orderBy: list('CmContactOrderByWithRelationInput'),
    cursor: 'CmContactWhereUniqueInput',
    distinct: 'CmContactScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContact.findMany({
      ...args,
      ...select,
    })
  },
})
