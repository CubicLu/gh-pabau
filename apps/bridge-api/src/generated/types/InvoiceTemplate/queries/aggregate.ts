import { queryField, list } from 'nexus'

export const InvoiceTemplateAggregateQuery = queryField(
  'aggregateInvoiceTemplate',
  {
    type: 'AggregateInvoiceTemplate',
    args: {
      where: 'InvoiceTemplateWhereInput',
      orderBy: list('InvoiceTemplateOrderByInput'),
      cursor: 'InvoiceTemplateWhereUniqueInput',
      distinct: 'InvoiceTemplateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invoiceTemplate.aggregate({ ...args, ...select }) as any
    },
  },
)
