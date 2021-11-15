import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrDeleteOneMutation = mutationField(
  'deleteOneMedicalContactAttr',
  {
    type: 'MedicalContactAttr',
    args: {
      where: nonNull('MedicalContactAttrWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalContactAttr.delete({
        where,
        ...select,
      })
    },
  },
)
