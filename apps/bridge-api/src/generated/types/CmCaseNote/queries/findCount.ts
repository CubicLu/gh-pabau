import { queryField, nonNull, list } from 'nexus'

export const CmCaseNoteFindCountQuery = queryField('findManyCmCaseNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    distinct: 'CmCaseNoteScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCaseNote.count(args as any)
  },
})
