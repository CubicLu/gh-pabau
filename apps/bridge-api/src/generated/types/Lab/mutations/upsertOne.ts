import { mutationField, nonNull } from 'nexus'

export const LabUpsertOneMutation = mutationField('upsertOneLab', {
  type: nonNull('Lab'),
  args: {
    where: nonNull('LabWhereUniqueInput'),
    create: nonNull('LabCreateInput'),
    update: nonNull('LabUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.upsert({
      ...args,
      ...select,
    })
  },
})
