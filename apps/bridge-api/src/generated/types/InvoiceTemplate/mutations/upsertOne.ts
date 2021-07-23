import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateUpsertOneMutation = mutationField(
  'upsertOneInvoiceTemplate',
  {
    type: nonNull('InvoiceTemplate'),
    args: {
      where: nonNull('InvoiceTemplateWhereUniqueInput'),
      create: nonNull('InvoiceTemplateCreateInput'),
      update: nonNull('InvoiceTemplateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invoiceTemplate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
