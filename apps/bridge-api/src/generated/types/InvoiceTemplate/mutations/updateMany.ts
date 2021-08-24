import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateUpdateManyMutation = mutationField(
  'updateManyInvoiceTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvoiceTemplateWhereInput',
      data: nonNull('InvoiceTemplateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invoiceTemplate.updateMany(args as any)
    },
  },
)
