import { queryField, nonNull } from 'nexus'

export const GlCodeFindUniqueQuery = queryField('findUniqueGlCode', {
  type: 'GlCode',
  args: {
    where: nonNull('GlCodeWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.glCode.findUnique({
      where,
      ...select,
    })
  },
})
