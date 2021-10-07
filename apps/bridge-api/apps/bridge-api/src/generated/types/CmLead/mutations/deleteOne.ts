import { mutationField, nonNull } from 'nexus'

export const CmLeadDeleteOneMutation = mutationField('deleteOneCmLead', {
  type: 'CmLead',
  args: {
    where: nonNull('CmLeadWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmLead.delete({
      where,
      ...select,
    })
  },
})
