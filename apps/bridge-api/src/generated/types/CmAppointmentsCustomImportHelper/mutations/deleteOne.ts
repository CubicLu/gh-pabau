import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperDeleteOneMutation = mutationField(
  'deleteOneCmAppointmentsCustomImportHelper',
  {
    type: 'CmAppointmentsCustomImportHelper',
    args: {
      where: nonNull('CmAppointmentsCustomImportHelperWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmAppointmentsCustomImportHelper.delete({
        where,
        ...select,
      })
    },
  },
)
