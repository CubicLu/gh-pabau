import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralDeleteOneMutation = mutationField(
  'deleteOneCmStaffGeneral',
  {
    type: 'CmStaffGeneral',
    args: {
      where: nonNull('CmStaffGeneralWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmStaffGeneral.delete({
        where,
        ...select,
      })
    },
  },
)
