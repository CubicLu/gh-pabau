import { objectType, arg, extendType } from 'nexus'

export const CancellationPolicy = objectType({
  name: 'CancellationPolicy',
  definition(t) {
    t.model.id()
    t.model.isActive()
    t.model.policyType()
    t.model.policyAction()
    t.model.policyValue()
    t.model.policyNotice()
    t.model.policyMessage()
    t.model.policyOverride()
    t.model.paymentProtection()
    t.model.advancedCancellationFee()
    t.model.noShowFee()
    t.model.occupier()
    t.model.creationDate()
    t.model.modifiedDate()
  },
})

export const cancellationPolicyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cancellationPolicy()
    t.field('findFirstCancellationPolicy', {
      type: 'CancellationPolicy',
      args: {
        where: 'CancellationPolicyWhereInput',
        orderBy: arg({ type: 'CancellationPolicyOrderByInput' }),
        cursor: 'CancellationPolicyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cancellationPolicy.findFirst(args as any)
      },
    })
    t.crud.cancellationPolicies({ filtering: true, ordering: true })
    t.field('cancellationPoliciesCount', {
      type: 'Int',
      args: {
        where: 'CancellationPolicyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cancellationPolicy.count(args as any)
      },
    })
  },
})

export const cancellationPolicyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCancellationPolicy()
    t.crud.updateOneCancellationPolicy()
    t.crud.upsertOneCancellationPolicy()
    t.crud.deleteOneCancellationPolicy()
    t.crud.updateManyCancellationPolicy()
    t.crud.deleteManyCancellationPolicy()
  },
})
