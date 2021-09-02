import { queryField, nonNull, list } from 'nexus'

export const CmContactNoteFindManyQuery = queryField('findManyCmContactNote', {
  type: nonNull(list(nonNull('CmContactNote'))),
  args: {
    where: 'CmContactNoteWhereInput',
    orderBy: list('CmContactNoteOrderByWithRelationInput'),
    cursor: 'CmContactNoteWhereUniqueInput',
    distinct: 'CmContactNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmContactNote.findMany({
      ...args,
      ...select,
    })
  },
})
