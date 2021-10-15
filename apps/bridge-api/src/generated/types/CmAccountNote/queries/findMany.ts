import { queryField, nonNull, list } from 'nexus'

export const CmAccountNoteFindManyQuery = queryField('findManyCmAccountNote', {
  type: nonNull(list(nonNull('CmAccountNote'))),
  args: {
    where: 'CmAccountNoteWhereInput',
    orderBy: list('CmAccountNoteOrderByInput'),
    cursor: 'CmAccountNoteWhereUniqueInput',
    distinct: 'CmAccountNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmAccountNote.findMany({
      ...args,
      ...select,
    })
  },
})
