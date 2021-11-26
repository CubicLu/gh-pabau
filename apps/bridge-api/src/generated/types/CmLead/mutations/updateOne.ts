import { mutationField, nonNull } from 'nexus'

export const CmLeadUpdateOneMutation = mutationField('updateOneCmLead', {
  type: nonNull('CmLead'),
  args: {
    data: nonNull('CmLeadUpdateInput'),
    where: nonNull('CmLeadWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmLead.update({
      where,
      data,
      ...select,
    })
  },
})
