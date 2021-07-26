import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateCreateOneMutation = mutationField(
  'createOneInvoiceTemplate',
  {
    type: nonNull('InvoiceTemplate'),
    args: {
      data: nonNull('InvoiceTemplateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invoiceTemplate.create({
        data,
        ...select,
      })
    },
  },
)
