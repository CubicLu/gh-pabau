import { queryField, nonNull, list } from 'nexus'

export const InvoiceFindCountQuery = queryField('findManyInvoiceCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvoiceWhereInput',
    orderBy: list('InvoiceOrderByWithRelationInput'),
    cursor: 'InvoiceWhereUniqueInput',
    distinct: 'InvoiceScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invoice.count(args as any)
  },
})
