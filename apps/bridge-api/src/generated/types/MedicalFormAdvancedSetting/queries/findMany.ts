import { queryField, nonNull, list } from 'nexus'

export const MedicalFormAdvancedSettingFindManyQuery = queryField(
  'findManyMedicalFormAdvancedSetting',
  {
    type: nonNull(list(nonNull('MedicalFormAdvancedSetting'))),
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByWithRelationInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormAdvancedSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
