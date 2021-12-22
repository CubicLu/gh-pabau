import { mutationField, nonNull } from 'nexus'

export const ConnectRegistrationFieldUpdateManyMutation = mutationField(
  'updateManyConnectRegistrationField',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ConnectRegistrationFieldUpdateManyMutationInput'),
      where: 'ConnectRegistrationFieldWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.connectRegistrationField.updateMany(args as any)
    },
  },
)
