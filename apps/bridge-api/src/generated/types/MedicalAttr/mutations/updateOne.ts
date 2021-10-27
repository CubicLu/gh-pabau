import { mutationField, nonNull } from 'nexus'

export const MedicalAttrUpdateOneMutation = mutationField(
  'updateOneMedicalAttr',
  {
    type: nonNull('MedicalAttr'),
    args: {
      where: nonNull('MedicalAttrWhereUniqueInput'),
      data: nonNull('MedicalAttrUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalAttr.update({
        where,
        data,
        ...select,
      })
    },
  },
)
