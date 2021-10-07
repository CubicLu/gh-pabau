import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeCreateOneMutation = mutationField(
  'createOneCreditNoteType',
  {
    type: nonNull('CreditNoteType'),
    args: {
      data: nonNull('CreditNoteTypeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.creditNoteType.create({
        data,
        ...select,
      })
    },
  },
)
