import { mutationField, nonNull } from 'nexus'

export const ConnectRegistrationFieldUpsertOneMutation = mutationField(
  'upsertOneConnectRegistrationField',
  {
    type: nonNull('ConnectRegistrationField'),
    args: {
      where: nonNull('ConnectRegistrationFieldWhereUniqueInput'),
      create: nonNull('ConnectRegistrationFieldCreateInput'),
      update: nonNull('ConnectRegistrationFieldUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.connectRegistrationField.upsert({
        ...args,
        ...select,
      })
    },
  },
)
