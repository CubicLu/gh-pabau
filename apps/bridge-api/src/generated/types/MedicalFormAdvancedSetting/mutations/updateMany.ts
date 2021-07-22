import { mutationField, nonNull } from 'nexus'

export const MedicalFormAdvancedSettingUpdateManyMutation = mutationField(
  'updateManyMedicalFormAdvancedSetting',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalFormAdvancedSettingWhereInput',
      data: nonNull('MedicalFormAdvancedSettingUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormAdvancedSetting.updateMany(args as any)
    },
  },
)
