import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralUpdateOneMutation = mutationField(
  'updateOneCmStaffGeneral',
  {
    type: nonNull('CmStaffGeneral'),
    args: {
      where: nonNull('CmStaffGeneralWhereUniqueInput'),
      data: nonNull('CmStaffGeneralUpdateInput'),
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
