import { objectType, arg, extendType } from 'nexus'

export const candidate = objectType({
  name: 'candidate',
  definition(t) {
    t.model.id()
    t.model.contactId()
    t.model.createdDate()
    t.model.openingId()
    t.model.rating()
    t.model.candidateStatus()
    t.model.jobReferences()
    t.model.howHeard()
    t.model.referredBy()
    t.model.coverLetter()
    t.model.resume()
    t.model.dateAvailable()
    t.model.linkedin()
    t.model.companyId()
  },
})

export const candidateQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.candidate()
    t.field('findFirstcandidate', {
      type: 'candidate',
      args: {
        where: 'candidateWhereInput',
        orderBy: arg({ type: 'candidateOrderByInput' }),
        cursor: 'candidateWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.candidate.findFirst(args as any)
      },
    })
    t.crud.candidates({ filtering: true, ordering: true })
    t.field('candidatesCount', {
      type: 'Int',
      args: {
        where: 'candidateWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.candidate.count(args as any)
      },
    })
  },
})

export const candidateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnecandidate()
    t.crud.updateOnecandidate()
    t.crud.upsertOnecandidate()
    t.crud.deleteOnecandidate()
    t.crud.updateManycandidate()
    t.crud.deleteManycandidate()
  },
})
