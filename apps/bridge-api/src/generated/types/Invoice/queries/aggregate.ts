import { queryField, list } from 'nexus'

export const InvoiceAggregateQuery = queryField('aggregateInvoice', {
  type: 'AggregateInvoice',
  args: {
    where: 'InvoiceWhereInput',
    orderBy: list('InvoiceOrderByWithRelationInput'),
    cursor: 'InvoiceWhereUniqueInput',
    distinct: 'InvoiceScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invoice.aggregate({ ...args, ...select }) as any
  },
})
