import { queryField, nonNull, list } from 'nexus'

export const CmAccountNoteFindManyQuery = queryField('findManyCmAccountNote', {
  type: nonNull(list(nonNull('CmAccountNote'))),
  args: {
    where: 'CmAccountNoteWhereInput',
    orderBy: list('CmAccountNoteOrderByWithRelationInput'),
    cursor: 'CmAccountNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmAccountNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmAccountNote.findMany({
      ...args,
      ...select,
    })
  },
})
