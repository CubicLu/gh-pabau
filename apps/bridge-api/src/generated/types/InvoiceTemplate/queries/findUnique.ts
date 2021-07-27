import { queryField, nonNull } from 'nexus'

export const InvoiceTemplateFindUniqueQuery = queryField(
  'findUniqueInvoiceTemplate',
  {
    type: 'InvoiceTemplate',
    args: {
      where: nonNull('InvoiceTemplateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.invoiceTemplate.findUnique({
        where,
        ...select,
      })
    },
  },
)
