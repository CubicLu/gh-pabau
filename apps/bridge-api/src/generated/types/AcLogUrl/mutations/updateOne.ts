import { mutationField, nonNull } from 'nexus'

export const AcLogUrlUpdateOneMutation = mutationField('updateOneAcLogUrl', {
  type: nonNull('AcLogUrl'),
  args: {
    data: nonNull('AcLogUrlUpdateInput'),
    where: nonNull('AcLogUrlWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.acLogUrl.update({
      where,
      data,
      ...select,
    })
  },
})
