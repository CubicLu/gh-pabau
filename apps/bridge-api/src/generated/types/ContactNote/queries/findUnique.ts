import { queryField, nonNull } from 'nexus'

export const ContactNoteFindUniqueQuery = queryField('findUniqueContactNote', {
  type: 'ContactNote',
  args: {
    where: nonNull('ContactNoteWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.contactNote.findUnique({
      where,
      ...select,
    })
  },
})
