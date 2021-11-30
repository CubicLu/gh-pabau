import { mutationField, nonNull } from 'nexus'

export const CmContactUpdateOneMutation = mutationField('updateOneCmContact', {
  type: nonNull('CmContact'),
  args: {
    data: nonNull('CmContactUpdateInput'),
    where: nonNull('CmContactWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmContact.update({
      where,
      data,
      ...select,
    })
  },
})
