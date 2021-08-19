import { mutationField, nonNull } from 'nexus'

export const CmLabelCreateOneMutation = mutationField('createOneCmLabel', {
  type: nonNull('CmLabel'),
  args: {
    data: nonNull('CmLabelCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmLabel.create({
      data,
      ...select,
    })
  },
})
