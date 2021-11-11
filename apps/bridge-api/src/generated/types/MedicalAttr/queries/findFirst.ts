import { queryField, list } from 'nexus'

export const MedicalAttrFindFirstQuery = queryField('findFirstMedicalAttr', {
  type: 'MedicalAttr',
  args: {
    where: 'MedicalAttrWhereInput',
    orderBy: list('MedicalAttrOrderByWithRelationInput'),
    cursor: 'MedicalAttrWhereUniqueInput',
    distinct: 'MedicalAttrScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalAttr.findFirst({
      ...args,
      ...select,
    })
  },
})
