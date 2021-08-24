import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeUpdateOneMutation = mutationField(
  'updateOneCreditNoteType',
  {
    type: nonNull('CreditNoteType'),
    args: {
      where: nonNull('CreditNoteTypeWhereUniqueInput'),
      data: nonNull('CreditNoteTypeUpdateInput'),
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
