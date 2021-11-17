import { queryField, nonNull, list } from 'nexus'

export const MedicalAttrFindManyQuery = queryField('findManyMedicalAttr', {
  type: nonNull(list(nonNull('MedicalAttr'))),
  args: {
    where: 'MedicalAttrWhereInput',
    orderBy: list('MedicalAttrOrderByWithRelationInput'),
    cursor: 'MedicalAttrWhereUniqueInput',
    distinct: 'MedicalAttrScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.medicalAttr.findMany({
      ...args,
      ...select,
    })
  },
})
