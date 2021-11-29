import { queryField, nonNull, list } from 'nexus'

export const CmCaseNoteFindManyQuery = queryField('findManyCmCaseNote', {
  type: nonNull(list(nonNull('CmCaseNote'))),
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByWithRelationInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseNoteScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseNote.findMany({
      ...args,
      ...select,
    })
  },
})
