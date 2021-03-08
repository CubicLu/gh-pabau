import { objectType, arg, extendType } from 'nexus'

export const MediaLlibraryAttachments = objectType({
  name: 'MediaLlibraryAttachments',
  definition(t) {
    t.model.id()
    t.model.fileUrl()
    t.model.companyId()
    t.model.contactId()
    t.model.communicationId()
    t.model.medicalFormContactId()
    t.model.contactAttachmentId()
    t.model.salesId()
    t.model.statementId()
    t.model.creationDate()
  },
})

export const mediaLlibraryAttachmentsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.mediaLlibraryAttachments()
    t.field('findFirstMediaLlibraryAttachments', {
      type: 'MediaLlibraryAttachments',
      args: {
        where: 'MediaLlibraryAttachmentsWhereInput',
        orderBy: arg({ type: 'MediaLlibraryAttachmentsOrderByInput' }),
        cursor: 'MediaLlibraryAttachmentsWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.mediaLlibraryAttachments.findFirst(args as any)
      },
    })
    t.crud.mediaLlibraryAttachments({ filtering: true, ordering: true })
    t.field('mediaLlibraryAttachmentsCount', {
      type: 'Int',
      args: {
        where: 'MediaLlibraryAttachmentsWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.mediaLlibraryAttachments.count(args as any)
      },
    })
  },
})

export const mediaLlibraryAttachmentsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMediaLlibraryAttachments()
    t.crud.updateOneMediaLlibraryAttachments()
    t.crud.upsertOneMediaLlibraryAttachments()
    t.crud.deleteOneMediaLlibraryAttachments()
    t.crud.updateManyMediaLlibraryAttachments()
    t.crud.deleteManyMediaLlibraryAttachments()
  },
})
