import { mutationField, nonNull } from 'nexus'

export const ApiKeyUpdateOneMutation = mutationField('updateOneApiKey', {
  type: nonNull('ApiKey'),
  args: {
    data: nonNull('ApiKeyUpdateInput'),
    where: nonNull('ApiKeyWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.apiKey.update({
      where,
      data,
      ...select,
    })
  },
})
