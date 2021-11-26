import { mutationField, nonNull } from 'nexus'

export const AcLogUpdateOneMutation = mutationField('updateOneAcLog', {
  type: nonNull('AcLog'),
  args: {
    data: nonNull('AcLogUpdateInput'),
    where: nonNull('AcLogWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.acLog.update({
      where,
      data,
      ...select,
    })
  },
})
