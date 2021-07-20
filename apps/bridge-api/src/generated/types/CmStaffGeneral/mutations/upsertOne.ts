import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralUpsertOneMutation = mutationField(
  'upsertOneCmStaffGeneral',
  {
    type: nonNull('CmStaffGeneral'),
    args: {
      where: nonNull('CmStaffGeneralWhereUniqueInput'),
      create: nonNull('CmStaffGeneralCreateInput'),
      update: nonNull('CmStaffGeneralUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmStaffGeneral.upsert({
        ...args,
        ...select,
      })
    },
  },
)
