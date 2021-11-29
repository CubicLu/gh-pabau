import { queryField, nonNull, list } from 'nexus'

export const InvoiceTemplateFindManyQuery = queryField(
  'findManyInvoiceTemplate',
  {
    type: nonNull(list(nonNull('InvoiceTemplate'))),
    args: {
      where: 'InvoiceTemplateWhereInput',
      orderBy: list('InvoiceTemplateOrderByWithRelationInput'),
      cursor: 'InvoiceTemplateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvoiceTemplateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invoiceTemplate.findMany({
        ...args,
        ...select,
      })
    },
  },
)
