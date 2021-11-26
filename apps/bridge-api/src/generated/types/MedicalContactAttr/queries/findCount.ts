import { queryField, nonNull, list } from 'nexus'

export const MedicalContactAttrFindCountQuery = queryField(
  'findManyMedicalContactAttrCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalContactAttrWhereInput',
      orderBy: list('MedicalContactAttrOrderByWithRelationInput'),
      cursor: 'MedicalContactAttrWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalContactAttrScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalContactAttr.count(args as any)
    },
  },
)
