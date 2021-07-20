import { mutationField, nonNull } from 'nexus'

export const CmCaseUpdateOneMutation = mutationField('updateOneCmCase', {
  type: nonNull('CmCase'),
  args: {
    where: nonNull('CmCaseWhereUniqueInput'),
    data: nonNull('CmCaseUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmCase.update({
      where,
      data,
      ...select,
    })
  },
})
