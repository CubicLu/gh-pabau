import { mutationField, nonNull } from 'nexus'

export const ApiDebugCreateOneMutation = mutationField('createOneApiDebug', {
  type: nonNull('ApiDebug'),
  args: {
    data: nonNull('ApiDebugCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.apiDebug.create({
      data,
      ...select,
    })
  },
})
