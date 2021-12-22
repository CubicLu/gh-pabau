import { mutationField, nonNull } from 'nexus'

export const ConnectRegistrationFieldCreateOneMutation = mutationField(
  'createOneConnectRegistrationField',
  {
    type: nonNull('ConnectRegistrationField'),
    args: {
      data: nonNull('ConnectRegistrationFieldCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.connectRegistrationField.create({
        data,
        ...select,
      })
    },
  },
)
