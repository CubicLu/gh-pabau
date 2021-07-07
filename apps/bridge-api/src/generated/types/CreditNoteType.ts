import { objectType, arg, extendType } from 'nexus'

export const CreditNoteType = objectType({
  name: 'CreditNoteType',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.name()
    t.model.code()
    t.model.prefix()
    t.model.quick_access()
    t.model.credit_note_type()
    t.model.is_disabled()
    t.model.Company()
  },
})

export const creditNoteTypeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.creditNoteType()
    t.field('findFirstCreditNoteType', {
      type: 'CreditNoteType',
      args: {
        where: 'CreditNoteTypeWhereInput',
        orderBy: arg({ type: 'CreditNoteTypeOrderByInput' }),
        cursor: 'CreditNoteTypeWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.creditNoteType.findFirst(args as any)
      },
    })
    t.crud.creditNoteTypes({ filtering: true, ordering: true })
    t.field('creditNoteTypesCount', {
      type: 'Int',
      args: {
        where: 'CreditNoteTypeWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.creditNoteType.count(args as any)
      },
    })
  },
})

export const creditNoteTypeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCreditNoteType()
    t.crud.updateOneCreditNoteType()
    t.crud.upsertOneCreditNoteType()
    t.crud.deleteOneCreditNoteType()
    t.crud.updateManyCreditNoteType()
  },
})
