import { queryField, nonNull, list } from 'nexus'

export const CmLeadNoteFindCountQuery = queryField('findManyCmLeadNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    distinct: 'CmLeadNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLeadNote.count(args as any)
  },
})
