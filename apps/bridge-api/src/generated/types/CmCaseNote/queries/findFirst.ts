import { queryField, list } from 'nexus'

export const CmCaseNoteFindFirstQuery = queryField('findFirstCmCaseNote', {
  type: 'CmCaseNote',
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByWithRelationInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseNote.findFirst({
      ...args,
      ...select,
    })
  },
})
