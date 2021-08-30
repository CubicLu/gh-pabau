import { queryField, nonNull, list } from 'nexus'

export const CreditNoteTypeFindManyQuery = queryField(
  'findManyCreditNoteType',
  {
    type: nonNull(list(nonNull('CreditNoteType'))),
    args: {
      where: 'CreditNoteTypeWhereInput',
      orderBy: list('CreditNoteTypeOrderByInput'),
      cursor: 'CreditNoteTypeWhereUniqueInput',
      distinct: 'CreditNoteTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditNoteType.findMany({
        ...args,
        ...select,
      })
    },
  },
)
