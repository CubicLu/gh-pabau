import { mutationField, nonNull } from 'nexus'

export const InvoiceTemplateDeleteOneMutation = mutationField(
  'deleteOneInvoiceTemplate',
  {
    type: 'InvoiceTemplate',
    args: {
      where: nonNull('InvoiceTemplateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invoiceTemplate.delete({
        where,
        ...select,
      })
    },
  },
)
