import { objectType, arg, extendType } from 'nexus'

export const Candidate = objectType({
  name: 'Candidate',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.created_date()
    t.model.opening_id()
    t.model.rating()
    t.model.candidate_status()
    t.model.job_references()
    t.model.how_heard()
    t.model.referred_by()
    t.model.cover_letter()
    t.model.resume()
    t.model.date_available()
    t.model.linkedin()
    t.model.company_id()
    t.model.company()
  },
})

export const candidateQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.candidate()
    t.field('findFirstCandidate', {
      type: 'Candidate',
      args: {
        where: 'CandidateWhereInput',
        orderBy: arg({ type: 'CandidateOrderByInput' }),
        cursor: 'CandidateWhereUniqueInput',
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
        where: 'CandidateWhereInput',
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
    t.crud.createOneCandidate()
    t.crud.updateOneCandidate()
    t.crud.upsertOneCandidate()
    t.crud.deleteOneCandidate()
  },
})
