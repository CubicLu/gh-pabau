import { mutationField, nonNull } from 'nexus'

export const LabUpdateOneMutation = mutationField('updateOneLab', {
  type: nonNull('Lab'),
  args: {
    where: nonNull('LabWhereUniqueInput'),
    data: nonNull('LabUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.lab.update({
      where,
      data,
      ...select,
    })
  },
})
