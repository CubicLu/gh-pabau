import { queryField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingFindUniqueQuery = queryField(
  'findUniqueMedicalFormAdvancedSetting',
  {
    type: 'MedicalFormAdvancedSetting',
    args: {
      where: nonNull('MedicalFormAdvancedSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalFormAdvancedSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
