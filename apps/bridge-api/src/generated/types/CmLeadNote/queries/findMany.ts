import { queryField, nonNull, list } from 'nexus'

export const CmLeadNoteFindManyQuery = queryField('findManyCmLeadNote', {
  type: nonNull(list(nonNull('CmLeadNote'))),
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByWithRelationInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLeadNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.findMany({
      ...args,
      ...select,
    })
  },
})
