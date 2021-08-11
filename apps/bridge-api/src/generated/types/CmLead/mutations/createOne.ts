import { mutationField, nonNull } from 'nexus'

export const CmLeadCreateOneMutation = mutationField('createOneCmLead', {
  type: nonNull('CmLead'),
  args: {
    data: nonNull('CmLeadCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmLead.create({
      data,
      ...select,
    })
  },
})
