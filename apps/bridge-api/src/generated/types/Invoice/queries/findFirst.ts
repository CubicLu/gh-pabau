import { queryField, list } from 'nexus'

export const InvoiceFindFirstQuery = queryField('findFirstInvoice', {
  type: 'Invoice',
  args: {
    where: 'InvoiceWhereInput',
    orderBy: list('InvoiceOrderByWithRelationInput'),
    cursor: 'InvoiceWhereUniqueInput',
    distinct: 'InvoiceScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invoice.findFirst({
      ...args,
      ...select,
    })
  },
})
