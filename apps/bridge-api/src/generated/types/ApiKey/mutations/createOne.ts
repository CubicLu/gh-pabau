import { mutationField, nonNull } from 'nexus'

export const ApiKeyCreateOneMutation = mutationField('createOneApiKey', {
  type: nonNull('ApiKey'),
  args: {
    data: nonNull('ApiKeyCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.apiKey.create({
      data,
      ...select,
    })
  },
})
