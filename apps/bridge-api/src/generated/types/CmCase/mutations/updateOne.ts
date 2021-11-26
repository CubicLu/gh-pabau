import { mutationField, nonNull } from 'nexus'

export const CmCaseUpdateOneMutation = mutationField('updateOneCmCase', {
  type: nonNull('CmCase'),
  args: {
    data: nonNull('CmCaseUpdateInput'),
    where: nonNull('CmCaseWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmCase.update({
      where,
      data,
      ...select,
    })
  },
})
