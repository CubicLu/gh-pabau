import { mutationField, nonNull } from 'nexus'

export const GlCodeUpdateOneMutation = mutationField('updateOneGlCode', {
  type: nonNull('GlCode'),
  args: {
    data: nonNull('GlCodeUpdateInput'),
    where: nonNull('GlCodeWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.glCode.update({
      where,
      data,
      ...select,
    })
  },
})
