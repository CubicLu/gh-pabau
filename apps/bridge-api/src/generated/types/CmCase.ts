import { objectType, arg, extendType } from 'nexus'

export const CmCase = objectType({
  name: 'CmCase',
  definition(t) {
    t.model.id()
    t.model.caseNumber()
    t.model.type()
    t.model.contact()
    t.model.email()
    t.model.subject()
    t.model.phone()
    t.model.request()
    t.model.critical()
    t.model.description()
    t.model.relatedTo()
    t.model.moduleType()
    t.model.userId()
    t.model.module2Type()
    t.model.user2Id()
    t.model.ownerid()
    t.model.status()
    t.model.priority()
    t.model.reason()
    t.model.reportedBy()
    t.model.comments()
    t.model.CreatedDate()
    t.model.IpAddress()
    t.model.companyId()
    t.model.company()
  },
})

export const cmCaseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmCase()
    t.field('findFirstCmCase', {
      type: 'CmCase',
      args: {
        where: 'CmCaseWhereInput',
        orderBy: arg({ type: 'CmCaseOrderByInput' }),
        cursor: 'CmCaseWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCase.findFirst(args as any)
      },
    })
    t.crud.cmCases({ filtering: true, ordering: true })
    t.field('cmCasesCount', {
      type: 'Int',
      args: {
        where: 'CmCaseWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmCase.count(args as any)
      },
    })
  },
})

export const cmCaseMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmCase()
    t.crud.updateOneCmCase()
    t.crud.upsertOneCmCase()
    t.crud.deleteOneCmCase()
    t.crud.updateManyCmCase()
    t.crud.deleteManyCmCase()
  },
})
