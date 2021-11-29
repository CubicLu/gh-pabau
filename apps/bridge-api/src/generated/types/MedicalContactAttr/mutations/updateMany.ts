import { mutationField, nonNull } from 'nexus'

export const MedicalContactAttrUpdateManyMutation = mutationField(
  'updateManyMedicalContactAttr',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalContactAttrUpdateManyMutationInput'),
      where: 'MedicalContactAttrWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalContactAttr.updateMany(args as any)
    },
  },
)
