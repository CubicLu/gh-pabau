import { mutationField, nonNull } from 'nexus'

export const InvoiceCreateOneMutation = mutationField('createOneInvoice', {
  type: nonNull('Invoice'),
  args: {
    data: nonNull('InvoiceCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.invoice.create({
      data,
      ...select,
    })
  },
})
