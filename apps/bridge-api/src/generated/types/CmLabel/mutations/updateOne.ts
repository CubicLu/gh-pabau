import { mutationField, nonNull } from 'nexus'

export const CmLabelUpdateOneMutation = mutationField('updateOneCmLabel', {
  type: nonNull('CmLabel'),
  args: {
    where: nonNull('CmLabelWhereUniqueInput'),
    data: nonNull('CmLabelUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmLabel.update({
      where,
      data,
      ...select,
    })
  },
})
