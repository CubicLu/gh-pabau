import { mutationField, nonNull } from 'nexus'

export const AcLogUpdateOneMutation = mutationField('updateOneAcLog', {
  type: nonNull('AcLog'),
  args: {
    where: nonNull('AcLogWhereUniqueInput'),
    data: nonNull('AcLogUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.acLog.update({
      where,
      data,
      ...select,
    })
  },
})
