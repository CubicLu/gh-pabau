import { queryField, list } from 'nexus'

export const CreditNoteTypeFindFirstQuery = queryField(
  'findFirstCreditNoteType',
  {
    type: 'CreditNoteType',
    args: {
      where: 'CreditNoteTypeWhereInput',
      orderBy: list('CreditNoteTypeOrderByWithRelationInput'),
      cursor: 'CreditNoteTypeWhereUniqueInput',
      distinct: 'CreditNoteTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditNoteType.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
