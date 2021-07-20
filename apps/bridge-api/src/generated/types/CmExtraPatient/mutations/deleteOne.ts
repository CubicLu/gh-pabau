import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientDeleteOneMutation = mutationField(
  'deleteOneCmExtraPatient',
  {
    type: 'CmExtraPatient',
    args: {
      where: nonNull('CmExtraPatientWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmExtraPatient.delete({
        where,
        ...select,
      })
    },
  },
)
