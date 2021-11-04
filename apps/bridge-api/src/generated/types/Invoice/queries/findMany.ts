import { queryField, nonNull, list } from 'nexus'

export const InvoiceFindManyQuery = queryField('findManyInvoice', {
  type: nonNull(list(nonNull('Invoice'))),
  args: {
    where: 'InvoiceWhereInput',
    orderBy: list('InvoiceOrderByWithRelationInput'),
    cursor: 'InvoiceWhereUniqueInput',
    distinct: 'InvoiceScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invoice.findMany({
      ...args,
      ...select,
    })
  },
})
