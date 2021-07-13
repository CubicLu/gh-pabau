import { queryField, nonNull } from 'nexus'

export const CmContactNoteFindUniqueQuery = queryField(
  'findUniqueCmContactNote',
  {
    type: 'CmContactNote',
    args: {
      where: nonNull('CmContactNoteWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactNote.findUnique({
        where,
        ...select,
      })
    },
  },
)
