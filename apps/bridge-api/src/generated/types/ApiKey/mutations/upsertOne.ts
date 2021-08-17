import { mutationField, nonNull } from 'nexus'

export const ApiKeyUpsertOneMutation = mutationField('upsertOneApiKey', {
  type: nonNull('ApiKey'),
  args: {
    where: nonNull('ApiKeyWhereUniqueInput'),
    create: nonNull('ApiKeyCreateInput'),
    update: nonNull('ApiKeyUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.upsert({
      ...args,
      ...select,
    })
  },
})
