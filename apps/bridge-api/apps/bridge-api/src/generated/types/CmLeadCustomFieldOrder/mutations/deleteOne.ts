import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldOrderDeleteOneMutation = mutationField(
  'deleteOneCmLeadCustomFieldOrder',
  {
    type: 'CmLeadCustomFieldOrder',
    args: {
      where: nonNull('CmLeadCustomFieldOrderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmLeadCustomFieldOrder.delete({
        where,
        ...select,
      })
    },
  },
)
