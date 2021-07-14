import { mutationField, nonNull } from 'nexus'

export const CmLeadUpdateOneMutation = mutationField('updateOneCmLead', {
  type: nonNull('CmLead'),
  args: {
    where: nonNull('CmLeadWhereUniqueInput'),
    data: nonNull('CmLeadUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmLead.update({
      where,
      data,
      ...select,
    })
  },
})
