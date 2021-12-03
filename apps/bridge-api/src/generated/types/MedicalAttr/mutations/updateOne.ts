import { mutationField, nonNull } from 'nexus'

export const MedicalAttrUpdateOneMutation = mutationField(
  'updateOneMedicalAttr',
  {
    type: nonNull('MedicalAttr'),
    args: {
      data: nonNull('MedicalAttrUpdateInput'),
      where: nonNull('MedicalAttrWhereUniqueInput'),
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
