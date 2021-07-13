import { mutationField, nonNull } from 'nexus'

export const CreditNoteTypeUpsertOneMutation = mutationField(
  'upsertOneCreditNoteType',
  {
    type: nonNull('CreditNoteType'),
    args: {
      where: nonNull('CreditNoteTypeWhereUniqueInput'),
      create: nonNull('CreditNoteTypeCreateInput'),
      update: nonNull('CreditNoteTypeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditNoteType.upsert({
        ...args,
        ...select,
      })
    },
  },
)
