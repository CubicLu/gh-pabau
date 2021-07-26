import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingDeleteOneMutation = mutationField(
  'deleteOneMedicalFormAdvancedSetting',
  {
    type: 'MedicalFormAdvancedSetting',
    args: {
      where: nonNull('MedicalFormAdvancedSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalFormAdvancedSetting.delete({
        where,
        ...select,
      })
    },
  },
)
