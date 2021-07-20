import { mutationField, nonNull } from 'nexus'

export const GlCodeUpdateOneMutation = mutationField('updateOneGlCode', {
  type: nonNull('GlCode'),
  args: {
    where: nonNull('GlCodeWhereUniqueInput'),
    data: nonNull('GlCodeUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.glCode.update({
      where,
      data,
      ...select,
    })
  },
})
