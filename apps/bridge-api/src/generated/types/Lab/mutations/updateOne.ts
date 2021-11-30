import { mutationField, nonNull } from 'nexus'

export const LabUpdateOneMutation = mutationField('updateOneLab', {
  type: nonNull('Lab'),
  args: {
    data: nonNull('LabUpdateInput'),
    where: nonNull('LabWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.lab.update({
      where,
      data,
      ...select,
    })
  },
})
