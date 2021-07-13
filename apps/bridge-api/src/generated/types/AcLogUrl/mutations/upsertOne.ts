import { mutationField, nonNull } from 'nexus'

export const AcLogUrlUpsertOneMutation = mutationField('upsertOneAcLogUrl', {
  type: nonNull('AcLogUrl'),
  args: {
    where: nonNull('AcLogUrlWhereUniqueInput'),
    create: nonNull('AcLogUrlCreateInput'),
    update: nonNull('AcLogUrlUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.upsert({
      ...args,
      ...select,
    })
  },
})
