import { mutationField, nonNull } from 'nexus'

export const ApiDebugUpdateOneMutation = mutationField('updateOneApiDebug', {
  type: nonNull('ApiDebug'),
  args: {
    data: nonNull('ApiDebugUpdateInput'),
    where: nonNull('ApiDebugWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.apiDebug.update({
      where,
      data,
      ...select,
    })
  },
})
