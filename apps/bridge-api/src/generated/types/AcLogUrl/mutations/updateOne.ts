import { mutationField, nonNull } from 'nexus'

export const AcLogUrlUpdateOneMutation = mutationField('updateOneAcLogUrl', {
  type: nonNull('AcLogUrl'),
  args: {
    where: nonNull('AcLogUrlWhereUniqueInput'),
    data: nonNull('AcLogUrlUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.acLogUrl.update({
      where,
      data,
      ...select,
    })
  },
})
