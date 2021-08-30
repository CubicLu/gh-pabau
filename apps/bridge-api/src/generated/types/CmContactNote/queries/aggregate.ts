import { queryField, list } from 'nexus'

export const CmContactNoteAggregateQuery = queryField(
  'aggregateCmContactNote',
  {
    type: 'AggregateCmContactNote',
    args: {
      where: 'CmContactNoteWhereInput',
      orderBy: list('CmContactNoteOrderByInput'),
      cursor: 'CmContactNoteWhereUniqueInput',
      distinct: 'CmContactNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactNote.aggregate({ ...args, ...select }) as any
    },
  },
)
