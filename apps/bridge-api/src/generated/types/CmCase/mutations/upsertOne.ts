import { mutationField, nonNull } from 'nexus'

export const CmCaseUpsertOneMutation = mutationField('upsertOneCmCase', {
  type: nonNull('CmCase'),
  args: {
    where: nonNull('CmCaseWhereUniqueInput'),
    create: nonNull('CmCaseCreateInput'),
    update: nonNull('CmCaseUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.upsert({
      ...args,
      ...select,
    })
  },
})
