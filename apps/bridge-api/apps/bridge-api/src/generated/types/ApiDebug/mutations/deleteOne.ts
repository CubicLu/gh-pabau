import { mutationField, nonNull } from 'nexus'

export const ApiDebugDeleteOneMutation = mutationField('deleteOneApiDebug', {
  type: 'ApiDebug',
  args: {
    where: nonNull('ApiDebugWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.apiDebug.delete({
      where,
      ...select,
    })
  },
})
