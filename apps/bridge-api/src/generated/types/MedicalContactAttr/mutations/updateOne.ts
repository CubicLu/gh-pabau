import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrUpdateOneMutation = mutationField(
  'updateOneMedicalContactAttr',
  {
    type: nonNull('MedicalContactAttr'),
    args: {
      data: nonNull('MedicalContactAttrUpdateInput'),
      where: nonNull('MedicalContactAttrWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalContactAttr.update({
        where,
        data,
        ...select,
      })
    },
  },
)
