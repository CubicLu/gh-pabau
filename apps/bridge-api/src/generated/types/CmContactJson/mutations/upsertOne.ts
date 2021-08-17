import { mutationField, nonNull } from 'nexus'

export const CmContactJsonUpsertOneMutation = mutationField(
  'upsertOneCmContactJson',
  {
    type: nonNull('CmContactJson'),
    args: {
      where: nonNull('CmContactJsonWhereUniqueInput'),
      create: nonNull('CmContactJsonCreateInput'),
      update: nonNull('CmContactJsonUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactJson.upsert({
        ...args,
        ...select,
      })
    },
  },
)
