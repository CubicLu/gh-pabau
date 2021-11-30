import { queryField, list } from 'nexus'

export const MedicalFormAdvancedSettingFindFirstQuery = queryField(
  'findFirstMedicalFormAdvancedSetting',
  {
    type: 'MedicalFormAdvancedSetting',
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      orderBy: list('MedicalFormAdvancedSettingOrderByWithRelationInput'),
      cursor: 'MedicalFormAdvancedSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormAdvancedSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
