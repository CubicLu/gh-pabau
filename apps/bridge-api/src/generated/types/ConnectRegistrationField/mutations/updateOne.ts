import { mutationField, nonNull } from 'nexus'

export const ConnectRegistrationFieldUpdateOneMutation = mutationField(
  'updateOneConnectRegistrationField',
  {
    type: nonNull('ConnectRegistrationField'),
    args: {
      data: nonNull('ConnectRegistrationFieldUpdateInput'),
      where: nonNull('ConnectRegistrationFieldWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.connectRegistrationField.update({
        where,
        data,
        ...select,
      })
    },
  },
)
