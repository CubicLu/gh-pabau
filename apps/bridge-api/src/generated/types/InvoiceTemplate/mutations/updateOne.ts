import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateUpdateOneMutation = mutationField(
  'updateOneInvoiceTemplate',
  {
    type: nonNull('InvoiceTemplate'),
    args: {
      where: nonNull('InvoiceTemplateWhereUniqueInput'),
      data: nonNull('InvoiceTemplateUpdateInput'),
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
