import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonUpsertOneMutation = mutationField(
  'upsertOneCmExtraSalon',
  {
    type: nonNull('CmExtraSalon'),
    args: {
      where: nonNull('CmExtraSalonWhereUniqueInput'),
      create: nonNull('CmExtraSalonCreateInput'),
      update: nonNull('CmExtraSalonUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraSalon.upsert({
        ...args,
        ...select,
      })
    },
  },
)
