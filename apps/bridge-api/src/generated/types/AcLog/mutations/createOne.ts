import { mutationField, nonNull } from 'nexus'

export const AcLogCreateOneMutation = mutationField('createOneAcLog', {
  type: nonNull('AcLog'),
  args: {
    data: nonNull('AcLogCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.acLog.create({
      data,
      ...select,
    })
  },
})
