import { mutationField, nonNull } from 'nexus'

export const GlCodeCreateOneMutation = mutationField('createOneGlCode', {
  type: nonNull('GlCode'),
  args: {
    data: nonNull('GlCodeCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.glCode.create({
      data,
      ...select,
    })
  },
})
