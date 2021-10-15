import { queryField, nonNull, list } from 'nexus'

export const CompanyNoteFindCountQuery = queryField(
  'findManyCompanyNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyNoteWhereInput',
      orderBy: list('CompanyNoteOrderByInput'),
      cursor: 'CompanyNoteWhereUniqueInput',
      distinct: 'CompanyNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyNote.count(args as any)
    },
  },
)
