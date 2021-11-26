import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralUpdateOneMutation = mutationField(
  'updateOneCmStaffGeneral',
  {
    type: nonNull('CmStaffGeneral'),
    args: {
      data: nonNull('CmStaffGeneralUpdateInput'),
      where: nonNull('CmStaffGeneralWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmStaffGeneral.update({
        where,
        data,
        ...select,
      })
    },
  },
)
