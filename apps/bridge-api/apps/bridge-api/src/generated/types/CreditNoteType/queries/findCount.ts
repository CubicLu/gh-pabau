import { queryField, nonNull, list } from 'nexus'

export const CreditNoteTypeFindCountQuery = queryField(
  'findManyCreditNoteTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CreditNoteTypeWhereInput',
      orderBy: list('CreditNoteTypeOrderByWithRelationInput'),
      cursor: 'CreditNoteTypeWhereUniqueInput',
      distinct: 'CreditNoteTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditNoteType.count(args as any)
    },
  },
)
