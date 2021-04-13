import { objectType, arg, extendType } from 'nexus'

export const CmContactNote = objectType({
  name: 'CmContactNote',
  definition(t) {
    t.model.ID()
    t.model.OwnerID()
    t.model.ContactID()
    t.model.Note()
    t.model.Status()
    t.model.CreatedDate()
    t.model.IpAddress()
    t.model.imported()
    t.model.User()
    t.model.CmContact()
  },
})

export const cmContactNoteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmContactNote()
    t.field('findFirstCmContactNote', {
      type: 'CmContactNote',
      args: {
        where: 'CmContactNoteWhereInput',
        orderBy: arg({ type: 'CmContactNoteOrderByInput' }),
        cursor: 'CmContactNoteWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactNote.findFirst(args as any)
      },
    })
    t.crud.cmContactNotes({ filtering: true, ordering: true })
    t.field('cmContactNotesCount', {
      type: 'Int',
      args: {
        where: 'CmContactNoteWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmContactNote.count(args as any)
      },
    })
  },
})

export const cmContactNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmContactNote()
    t.crud.updateOneCmContactNote()
    t.crud.upsertOneCmContactNote()
    t.crud.deleteOneCmContactNote()
    t.crud.updateManyCmContactNote()
  },
})
