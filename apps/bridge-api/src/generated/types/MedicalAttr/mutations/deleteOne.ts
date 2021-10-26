import { mutationField, nonNull } from 'nexus'

export const MedicalAttrDeleteOneMutation = mutationField(
  'deleteOneMedicalAttr',
  {
    type: 'MedicalAttr',
    args: {
      where: nonNull('MedicalAttrWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalAttr.delete({
        where,
        ...select,
      })
    },
  },
)
