import { objectType, arg, extendType } from 'nexus'

export const CompanyNote = objectType({
  name: 'CompanyNote',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.user_id()
    t.model.note()
    t.model.created_date()
    t.model.is_alert()
    t.model.Company()
    t.model.User()
  },
})

export const companyNoteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyNote()
    t.field('findFirstCompanyNote', {
      type: 'CompanyNote',
      args: {
        where: 'CompanyNoteWhereInput',
        orderBy: arg({ type: 'CompanyNoteOrderByInput' }),
        cursor: 'CompanyNoteWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyNote.findFirst(args as any)
      },
    })
    t.crud.companyNotes({ filtering: true, ordering: true })
    t.field('companyNotesCount', {
      type: 'Int',
      args: {
        where: 'CompanyNoteWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyNote.count(args as any)
      },
    })
  },
})

export const companyNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyNote()
    t.crud.updateOneCompanyNote()
    t.crud.upsertOneCompanyNote()
    t.crud.deleteOneCompanyNote()
    t.crud.updateManyCompanyNote()
  },
})
