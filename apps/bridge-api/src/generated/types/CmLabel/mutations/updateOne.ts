import { mutationField, nonNull } from 'nexus'

export const CmLabelUpdateOneMutation = mutationField('updateOneCmLabel', {
  type: nonNull('CmLabel'),
  args: {
    data: nonNull('CmLabelUpdateInput'),
    where: nonNull('CmLabelWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmLabel.update({
      where,
      data,
      ...select,
    })
  },
})
