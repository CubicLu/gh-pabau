import { mutationField, nonNull } from 'nexus'

export const CmContactLabelUpsertOneMutation = mutationField(
  'upsertOneCmContactLabel',
  {
    type: nonNull('CmContactLabel'),
    args: {
      where: nonNull('CmContactLabelWhereUniqueInput'),
      create: nonNull('CmContactLabelCreateInput'),
      update: nonNull('CmContactLabelUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLabel.upsert({
        ...args,
        ...select,
      })
    },
  },
)
