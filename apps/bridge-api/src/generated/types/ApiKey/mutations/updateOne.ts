import { mutationField, nonNull } from 'nexus'

export const ApiKeyUpdateOneMutation = mutationField('updateOneApiKey', {
  type: nonNull('ApiKey'),
  args: {
    where: nonNull('ApiKeyWhereUniqueInput'),
    data: nonNull('ApiKeyUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.apiKey.update({
      where,
      data,
      ...select,
    })
  },
})
