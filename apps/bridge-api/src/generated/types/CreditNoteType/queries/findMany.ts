import { queryField, nonNull, list } from 'nexus'

export const CreditNoteTypeFindManyQuery = queryField(
  'findManyCreditNoteType',
  {
    type: nonNull(list(nonNull('CreditNoteType'))),
    args: {
      where: 'CreditNoteTypeWhereInput',
      orderBy: list('CreditNoteTypeOrderByWithRelationInput'),
      cursor: 'CreditNoteTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CreditNoteTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditNoteType.findMany({
        ...args,
        ...select,
      })
    },
  },
)
