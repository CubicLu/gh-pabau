import { queryField, list } from 'nexus'

export const CmCaseNoteAggregateQuery = queryField('aggregateCmCaseNote', {
  type: 'AggregateCmCaseNote',
  args: {
    where: 'CmCaseNoteWhereInput',
    orderBy: list('CmCaseNoteOrderByWithRelationInput'),
    cursor: 'CmCaseNoteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseNote.aggregate({ ...args, ...select }) as any
  },
})
