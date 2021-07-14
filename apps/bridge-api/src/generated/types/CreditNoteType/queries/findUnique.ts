import { queryField, nonNull } from 'nexus'

export const CreditNoteTypeFindUniqueQuery = queryField(
  'findUniqueCreditNoteType',
  {
    type: 'CreditNoteType',
    args: {
      where: nonNull('CreditNoteTypeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.creditNoteType.findUnique({
        where,
        ...select,
      })
    },
  },
)
