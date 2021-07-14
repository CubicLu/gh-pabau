import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailUpdateManyMutation = mutationField(
  'updateManyInsuranceDetail',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InsuranceDetailWhereInput',
      data: nonNull('InsuranceDetailUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceDetail.updateMany(args as any)
    },
  },
)
