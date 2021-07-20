import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeDeleteOneMutation = mutationField(
  'deleteOneCreditNoteType',
  {
    type: 'CreditNoteType',
    args: {
      where: nonNull('CreditNoteTypeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.creditNoteType.delete({
        where,
        ...select,
      })
    },
  },
)
