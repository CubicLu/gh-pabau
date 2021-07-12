import { mutationField, nonNull } from 'nexus'

export const PageUpdateOneMutation = mutationField('updateOnePage', {
  type: nonNull('Page'),
  args: {
    where: nonNull('PageWhereUniqueInput'),
    data: nonNull('PageUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.page.update({
      where,
      data,
      ...select,
    })
  },
})
