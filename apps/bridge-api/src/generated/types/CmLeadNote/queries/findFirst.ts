import { queryField, list } from 'nexus'

export const CmLeadNoteFindFirstQuery = queryField('findFirstCmLeadNote', {
  type: 'CmLeadNote',
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByWithRelationInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLeadNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.findFirst({
      ...args,
      ...select,
    })
  },
})
