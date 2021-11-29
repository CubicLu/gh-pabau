import { queryField, list } from 'nexus'

export const CmAccountNoteFindFirstQuery = queryField(
  'findFirstCmAccountNote',
  {
    type: 'CmAccountNote',
    args: {
      where: 'CmAccountNoteWhereInput',
      orderBy: list('CmAccountNoteOrderByWithRelationInput'),
      cursor: 'CmAccountNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAccountNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAccountNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
