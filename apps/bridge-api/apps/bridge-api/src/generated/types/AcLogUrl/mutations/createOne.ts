import { mutationField, nonNull } from 'nexus'

export const AcLogUrlCreateOneMutation = mutationField('createOneAcLogUrl', {
  type: nonNull('AcLogUrl'),
  args: {
    data: nonNull('AcLogUrlCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.acLogUrl.create({
      data,
      ...select,
    })
  },
})
