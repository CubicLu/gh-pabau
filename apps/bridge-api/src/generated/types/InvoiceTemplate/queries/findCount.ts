import { queryField, nonNull, list } from 'nexus'

export const InvoiceTemplateFindCountQuery = queryField(
  'findManyInvoiceTemplateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvoiceTemplateWhereInput',
      orderBy: list('InvoiceTemplateOrderByWithRelationInput'),
      cursor: 'InvoiceTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvoiceTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invoiceTemplate.count(args as any)
    },
  },
)
