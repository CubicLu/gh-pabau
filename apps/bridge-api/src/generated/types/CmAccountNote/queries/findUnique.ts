import { queryField, nonNull } from 'nexus'

export const CmAccountNoteFindUniqueQuery = queryField(
  'findUniqueCmAccountNote',
  {
    type: 'CmAccountNote',
    args: {
      where: nonNull('CmAccountNoteWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmAccountNote.findUnique({
        where,
        ...select,
      })
    },
  },
)
