import { queryField, list } from 'nexus'

export const MedicalContactAttrFindFirstQuery = queryField(
  'findFirstMedicalContactAttr',
  {
    type: 'MedicalContactAttr',
    args: {
      where: 'MedicalContactAttrWhereInput',
      orderBy: list('MedicalContactAttrOrderByWithRelationInput'),
      cursor: 'MedicalContactAttrWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalContactAttrScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalContactAttr.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
