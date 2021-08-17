import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactUpsertOneMutation = mutationField(
  'upsertOneMedicalFormContact',
  {
    type: nonNull('MedicalFormContact'),
    args: {
      where: nonNull('MedicalFormContactWhereUniqueInput'),
      create: nonNull('MedicalFormContactCreateInput'),
      update: nonNull('MedicalFormContactUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.upsert({
        ...args,
        ...select,
      })
    },
  },
)
