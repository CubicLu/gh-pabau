import { mutationField, nonNull } from 'nexus'

export const ApiDebugUpdateOneMutation = mutationField('updateOneApiDebug', {
  type: nonNull('ApiDebug'),
  args: {
    where: nonNull('ApiDebugWhereUniqueInput'),
    data: nonNull('ApiDebugUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.apiDebug.update({
      where,
      data,
      ...select,
    })
  },
})
