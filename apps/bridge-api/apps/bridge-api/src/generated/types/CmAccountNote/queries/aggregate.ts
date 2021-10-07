import { queryField, list } from 'nexus'

export const CmAccountNoteAggregateQuery = queryField(
  'aggregateCmAccountNote',
  {
    type: 'AggregateCmAccountNote',
    args: {
      where: 'CmAccountNoteWhereInput',
      orderBy: list('CmAccountNoteOrderByWithRelationInput'),
      cursor: 'CmAccountNoteWhereUniqueInput',
      distinct: 'CmAccountNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAccountNote.aggregate({ ...args, ...select }) as any
    },
  },
)
