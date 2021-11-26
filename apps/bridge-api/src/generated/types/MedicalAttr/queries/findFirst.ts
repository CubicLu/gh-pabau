import { queryField, list } from 'nexus'

export const MedicalAttrFindFirstQuery = queryField('findFirstMedicalAttr', {
  type: 'MedicalAttr',
  args: {
    where: 'MedicalAttrWhereInput',
    orderBy: list('MedicalAttrOrderByWithRelationInput'),
    cursor: 'MedicalAttrWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('MedicalAttrScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalAttr.findFirst({
      ...args,
      ...select,
    })
  },
})
