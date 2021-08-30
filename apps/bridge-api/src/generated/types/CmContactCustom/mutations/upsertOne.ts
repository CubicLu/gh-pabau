import { mutationField, nonNull } from 'nexus'

export const CmContactCustomUpsertOneMutation = mutationField(
  'upsertOneCmContactCustom',
  {
    type: nonNull('CmContactCustom'),
    args: {
      where: nonNull('CmContactCustomWhereUniqueInput'),
      create: nonNull('CmContactCustomCreateInput'),
      update: nonNull('CmContactCustomUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.upsert({
        ...args,
        ...select,
      })
    },
  },
)
