import { mutationField, nonNull } from 'nexus'

export const CmContactLocationUpsertOneMutation = mutationField(
  'upsertOneCmContactLocation',
  {
    type: nonNull('CmContactLocation'),
    args: {
      where: nonNull('CmContactLocationWhereUniqueInput'),
      create: nonNull('CmContactLocationCreateInput'),
      update: nonNull('CmContactLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
