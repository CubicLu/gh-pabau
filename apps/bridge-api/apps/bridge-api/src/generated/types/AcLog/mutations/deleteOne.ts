import { mutationField, nonNull } from 'nexus'

export const AcLogDeleteOneMutation = mutationField('deleteOneAcLog', {
  type: 'AcLog',
  args: {
    where: nonNull('AcLogWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.acLog.delete({
      where,
      ...select,
    })
  },
})
