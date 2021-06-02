import { objectType, arg, extendType } from 'nexus'

export const CompanyBranchAttachment = objectType({
  name: 'CompanyBranchAttachment',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.location_id()
    t.model.type()
    t.model.url()
    t.model.description()
    t.model.Company()
    t.model.CompanyBranch()
  },
})

export const companyBranchAttachmentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyBranchAttachment()
    t.field('findFirstCompanyBranchAttachment', {
      type: 'CompanyBranchAttachment',
      args: {
        where: 'CompanyBranchAttachmentWhereInput',
        orderBy: arg({ type: 'CompanyBranchAttachmentOrderByInput' }),
        cursor: 'CompanyBranchAttachmentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranchAttachment.findFirst(args as any)
      },
    })
    t.crud.companyBranchAttachments({ filtering: true, ordering: true })
    t.field('companyBranchAttachmentsCount', {
      type: 'Int',
      args: {
        where: 'CompanyBranchAttachmentWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranchAttachment.count(args as any)
      },
    })
  },
})

export const companyBranchAttachmentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyBranchAttachment()
    t.crud.updateOneCompanyBranchAttachment()
    t.crud.upsertOneCompanyBranchAttachment()
    t.crud.deleteOneCompanyBranchAttachment()
    t.crud.updateManyCompanyBranchAttachment()
  },
})
