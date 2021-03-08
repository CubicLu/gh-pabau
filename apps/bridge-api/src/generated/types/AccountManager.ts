import { objectType, arg, extendType } from 'nexus'

export const AccountManager = objectType({
  name: 'AccountManager',
  definition(t) {
    t.model.id()
    t.model.organisationName()
    t.model.organisationStatus()
    t.model.organisationType()
    t.model.organisationNumber()
    t.model.organisationOwner()
    t.model.address1()
    t.model.address2()
    t.model.address3()
    t.model.town()
    t.model.county()
    t.model.postCode()
    t.model.country()
    t.model.tel()
    t.model.altTel()
    t.model.email()
    t.model.fax()
    t.model.website()
    t.model.slaContract()
    t.model.vatRegId()
    t.model.createdDate()
    t.model.modifiedDate()
    t.model.occupier()
    t.model.conPer1()
    t.model.conNum1()
    t.model.conPer2()
    t.model.conNum2()
    t.model.conPer3()
    t.model.conNum3()
  },
})

export const accountManagerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.accountManager()
    t.field('findFirstAccountManager', {
      type: 'AccountManager',
      args: {
        where: 'AccountManagerWhereInput',
        orderBy: arg({ type: 'AccountManagerOrderByInput' }),
        cursor: 'AccountManagerWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.accountManager.findFirst(args as any)
      },
    })
    t.crud.accountManagers({ filtering: true, ordering: true })
    t.field('accountManagersCount', {
      type: 'Int',
      args: {
        where: 'AccountManagerWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.accountManager.count(args as any)
      },
    })
  },
})

export const accountManagerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneAccountManager()
    t.crud.updateOneAccountManager()
    t.crud.upsertOneAccountManager()
    t.crud.deleteOneAccountManager()
    t.crud.updateManyAccountManager()
    t.crud.deleteManyAccountManager()
  },
})
