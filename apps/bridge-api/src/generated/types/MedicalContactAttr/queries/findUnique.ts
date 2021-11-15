import { queryField, nonNull } from 'nexus'

export const MedicalContactAttrFindUniqueQuery = queryField(
  'findUniqueMedicalContactAttr',
  {
    type: 'MedicalContactAttr',
    args: {
      where: nonNull('MedicalContactAttrWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalContactAttr.findUnique({
        where,
        ...select,
      })
    },
  },
)
