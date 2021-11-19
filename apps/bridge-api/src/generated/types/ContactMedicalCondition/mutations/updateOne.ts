import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionUpdateOneMutation = mutationField(
  'updateOneContactMedicalCondition',
  {
    type: nonNull('ContactMedicalCondition'),
    args: {
      where: nonNull('ContactMedicalConditionWhereUniqueInput'),
      data: nonNull('ContactMedicalConditionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.contactMedicalCondition.update({
        where,
        data,
        ...select,
      })
    },
  },
)
