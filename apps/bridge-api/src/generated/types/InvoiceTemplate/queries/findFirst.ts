import { queryField, list } from 'nexus'

export const InvoiceTemplateFindFirstQuery = queryField(
  'findFirstInvoiceTemplate',
  {
    type: 'InvoiceTemplate',
    args: {
      where: 'InvoiceTemplateWhereInput',
      orderBy: list('InvoiceTemplateOrderByWithRelationInput'),
      cursor: 'InvoiceTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvoiceTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invoiceTemplate.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
