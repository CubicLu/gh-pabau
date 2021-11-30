import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateUpdateManyMutation = mutationField(
  'updateManyInvoiceTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvoiceTemplateUpdateManyMutationInput'),
      where: 'InvoiceTemplateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invoiceTemplate.updateMany(args as any)
    },
  },
)
