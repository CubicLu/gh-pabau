import { mutationField, nonNull } from 'nexus'

export const InsuranceDetailUpdateManyMutation = mutationField(
  'updateManyInsuranceDetail',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InsuranceDetailUpdateManyMutationInput'),
      where: 'InsuranceDetailWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.insuranceDetail.updateMany(args as any)
    },
  },
)
