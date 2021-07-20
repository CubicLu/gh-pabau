import { mutationField, nonNull } from 'nexus'

export const CmCaseCreateOneMutation = mutationField('createOneCmCase', {
  type: nonNull('CmCase'),
  args: {
    data: nonNull('CmCaseCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmCase.create({
      data,
      ...select,
    })
  },
})
