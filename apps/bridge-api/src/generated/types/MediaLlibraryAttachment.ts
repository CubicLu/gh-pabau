import { objectType, arg, extendType } from 'nexus'

export const MediaLlibraryAttachment = objectType({
  name: 'MediaLlibraryAttachment',
  definition(t) {
    t.model.id()
    t.model.file_url()
    t.model.company_id()
    t.model.contact_id()
    t.model.communication_id()
    t.model.medical_form_contact_id()
    t.model.contact_attachment_id()
    t.model.sales_id()
    t.model.statement_id()
    t.model.creation_date()
  },
})

export const mediaLlibraryAttachmentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.mediaLlibraryAttachment()
    t.field('findFirstMediaLlibraryAttachment', {
      type: 'MediaLlibraryAttachment',
      args: {
        where: 'MediaLlibraryAttachmentWhereInput',
        orderBy: arg({ type: 'MediaLlibraryAttachmentOrderByInput' }),
        cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.mediaLlibraryAttachment.findFirst(args as any)
      },
    })
    t.crud.mediaLlibraryAttachments({ filtering: true, ordering: true })
    t.field('mediaLlibraryAttachmentsCount', {
      type: 'Int',
      args: {
        where: 'MediaLlibraryAttachmentWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.mediaLlibraryAttachment.count(args as any)
      },
    })
  },
})

export const mediaLlibraryAttachmentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMediaLlibraryAttachment()
    t.crud.updateOneMediaLlibraryAttachment()
    t.crud.upsertOneMediaLlibraryAttachment()
    t.crud.deleteOneMediaLlibraryAttachment()
  },
})
