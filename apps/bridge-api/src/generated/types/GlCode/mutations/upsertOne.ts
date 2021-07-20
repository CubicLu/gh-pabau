import { mutationField, nonNull } from 'nexus'

export const GlCodeUpsertOneMutation = mutationField('upsertOneGlCode', {
  type: nonNull('GlCode'),
  args: {
    where: nonNull('GlCodeWhereUniqueInput'),
    create: nonNull('GlCodeCreateInput'),
    update: nonNull('GlCodeUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.glCode.upsert({
      ...args,
      ...select,
    })
  },
})
