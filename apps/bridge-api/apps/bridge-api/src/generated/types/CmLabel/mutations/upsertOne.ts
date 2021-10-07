import { mutationField, nonNull } from 'nexus'

export const CmLabelUpsertOneMutation = mutationField('upsertOneCmLabel', {
  type: nonNull('CmLabel'),
  args: {
    where: nonNull('CmLabelWhereUniqueInput'),
    create: nonNull('CmLabelCreateInput'),
    update: nonNull('CmLabelUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLabel.upsert({
      ...args,
      ...select,
    })
  },
})
