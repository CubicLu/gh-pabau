import { queryField, nonNull, list } from 'nexus'

export const CmLeadNoteFindCountQuery = queryField('findManyCmLeadNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByWithRelationInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmLeadNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLeadNote.count(args as any)
  },
})
