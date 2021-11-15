import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrUpdateOneMutation = mutationField(
  'updateOneMedicalContactAttr',
  {
    type: nonNull('MedicalContactAttr'),
    args: {
      where: nonNull('MedicalContactAttrWhereUniqueInput'),
      data: nonNull('MedicalContactAttrUpdateInput'),
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
