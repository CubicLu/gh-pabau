import { queryField, nonNull } from 'nexus'

export const MedicalAttrFindUniqueQuery = queryField('findUniqueMedicalAttr', {
  type: 'MedicalAttr',
  args: {
    where: nonNull('MedicalAttrWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.medicalAttr.findUnique({
      where,
      ...select,
    })
  },
})
