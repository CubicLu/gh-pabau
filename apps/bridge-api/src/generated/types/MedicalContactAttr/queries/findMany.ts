import { queryField, nonNull, list } from 'nexus'

export const MedicalContactAttrFindManyQuery = queryField(
  'findManyMedicalContactAttr',
  {
    type: nonNull(list(nonNull('MedicalContactAttr'))),
    args: {
      where: 'MedicalContactAttrWhereInput',
      orderBy: list('MedicalContactAttrOrderByWithRelationInput'),
      cursor: 'MedicalContactAttrWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalContactAttrScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalContactAttr.findMany({
        ...args,
        ...select,
      })
    },
  },
)
