import { queryField, list } from 'nexus'

export const CmContactNoteFindFirstQuery = queryField(
  'findFirstCmContactNote',
  {
    type: 'CmContactNote',
    args: {
      where: 'CmContactNoteWhereInput',
      orderBy: list('CmContactNoteOrderByWithRelationInput'),
      cursor: 'CmContactNoteWhereUniqueInput',
      distinct: 'CmContactNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
