import { queryField, list } from 'nexus'

export const CmLeadNoteFindFirstQuery = queryField('findFirstCmLeadNote', {
  type: 'CmLeadNote',
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    distinct: 'CmLeadNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.findFirst({
      ...args,
      ...select,
    })
  },
})
