import { mutationField, nonNull } from 'nexus'

export const CompanyNoteUpdateManyMutation = mutationField(
  'updateManyCompanyNote',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CompanyNoteWhereInput',
      data: nonNull('CompanyNoteUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyNote.updateMany(args as any)
    },
  },
)
