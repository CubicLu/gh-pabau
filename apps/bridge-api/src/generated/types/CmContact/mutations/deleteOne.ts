import { mutationField, nonNull } from 'nexus'

export const CmContactDeleteOneMutation = mutationField('deleteOneCmContact', {
  type: 'CmContact',
  args: {
    where: nonNull('CmContactWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmContact.delete({
      where,
      ...select,
    })
  },
})
