import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralCreateOneMutation = mutationField(
  'createOneCmStaffGeneral',
  {
    type: nonNull('CmStaffGeneral'),
    args: {
      data: nonNull('CmStaffGeneralCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmStaffGeneral.create({
        data,
        ...select,
      })
    },
  },
)
