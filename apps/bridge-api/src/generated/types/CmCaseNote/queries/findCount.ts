import { queryField, nonNull, list } from 'nexus'

export const CmCaseNoteFindCountQuery = queryField('findManyCmCaseNoteCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByWithRelationInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCaseNote.count(args as any)
  },
})
