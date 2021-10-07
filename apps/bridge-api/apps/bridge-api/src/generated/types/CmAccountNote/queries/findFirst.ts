import { queryField, list } from 'nexus'

export const CmAccountNoteFindFirstQuery = queryField(
  'findFirstCmAccountNote',
  {
    type: 'CmAccountNote',
    args: {
      where: 'CmAccountNoteWhereInput',
      orderBy: list('CmAccountNoteOrderByWithRelationInput'),
      cursor: 'CmAccountNoteWhereUniqueInput',
      distinct: 'CmAccountNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAccountNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
