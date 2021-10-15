import { queryField, nonNull, list } from 'nexus'

export const CmLeadNoteFindManyQuery = queryField('findManyCmLeadNote', {
  type: nonNull(list(nonNull('CmLeadNote'))),
  args: {
    where: 'CmLeadNoteWhereInput',
    orderBy: list('CmLeadNoteOrderByInput'),
    cursor: 'CmLeadNoteWhereUniqueInput',
    distinct: 'CmLeadNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLeadNote.findMany({
      ...args,
      ...select,
    })
  },
})
