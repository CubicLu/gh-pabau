import { queryField, nonNull, list } from 'nexus'

export const MedicalContactAttrFindCountQuery = queryField(
  'findManyMedicalContactAttrCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalContactAttrWhereInput',
      orderBy: list('MedicalContactAttrOrderByWithRelationInput'),
      cursor: 'MedicalContactAttrWhereUniqueInput',
      distinct: 'MedicalContactAttrScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalContactAttr.count(args as any)
    },
  },
)
