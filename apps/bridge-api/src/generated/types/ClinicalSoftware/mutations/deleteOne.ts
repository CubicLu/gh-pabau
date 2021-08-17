import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareDeleteOneMutation = mutationField(
  'deleteOneClinicalSoftware',
  {
    type: 'ClinicalSoftware',
    args: {
      where: nonNull('ClinicalSoftwareWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.clinicalSoftware.delete({
        where,
        ...select,
      })
    },
  },
)
