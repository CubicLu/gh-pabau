import { queryField, nonNull } from 'nexus'

export const InvoiceFindUniqueQuery = queryField('findUniqueInvoice', {
  type: 'Invoice',
  args: {
    where: nonNull('InvoiceWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invoice.findUnique({
      where,
      ...select,
    })
  },
})
