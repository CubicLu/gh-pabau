import { queryField, list } from 'nexus'

export const CmCaseNoteFindFirstQuery = queryField('findFirstCmCaseNote', {
  type: 'CmCaseNote',
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    distinct: 'CmCaseNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseNote.findFirst({
      ...args,
      ...select,
    })
  },
})
