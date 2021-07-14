import { mutationField, nonNull } from 'nexus'

export const CmContactUpdateOneMutation = mutationField('updateOneCmContact', {
  type: nonNull('CmContact'),
  args: {
    where: nonNull('CmContactWhereUniqueInput'),
    data: nonNull('CmContactUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmContact.update({
      where,
      data,
      ...select,
    })
  },
})
