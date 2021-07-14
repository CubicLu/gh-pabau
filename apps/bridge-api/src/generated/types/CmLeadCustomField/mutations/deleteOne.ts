import { mutationField, nonNull } from 'nexus'

export const CmLeadCustomFieldDeleteOneMutation = mutationField(
  'deleteOneCmLeadCustomField',
  {
    type: 'CmLeadCustomField',
    args: {
      where: nonNull('CmLeadCustomFieldWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmLeadCustomField.delete({
        where,
        ...select,
      })
    },
  },
)
