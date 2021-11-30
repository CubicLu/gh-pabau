import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateUpdateOneMutation = mutationField(
  'updateOneInvoiceTemplate',
  {
    type: nonNull('InvoiceTemplate'),
    args: {
      data: nonNull('InvoiceTemplateUpdateInput'),
      where: nonNull('InvoiceTemplateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invoiceTemplate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
