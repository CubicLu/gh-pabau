import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeUpdateOneMutation = mutationField(
  'updateOneCreditNoteType',
  {
    type: nonNull('CreditNoteType'),
    args: {
      data: nonNull('CreditNoteTypeUpdateInput'),
      where: nonNull('CreditNoteTypeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.creditNoteType.update({
        where,
        data,
        ...select,
      })
    },
  },
)
