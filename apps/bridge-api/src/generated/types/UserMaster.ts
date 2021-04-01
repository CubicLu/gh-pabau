import { objectType, arg, extendType } from 'nexus'

export const UserMaster = objectType({
  name: 'UserMaster',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.fname()
    t.model.lname()
    t.model.address()
    t.model.city()
    t.model.state()
    t.model.country()
    t.model.postalcode()
    t.model.prefloc()
    t.model.email()
    t.model.pass()
    t.model.oauth_provider()
    t.model.oauth_id()
    t.model.timestamp()
    t.model.enc_key()
    t.model.pic()
    t.model.contact_id()
    t.model.mobile()
    t.model.last_login()
    t.model.is_suspended()
    t.model.session_hash()
    t.model.Company()
  },
})

export const userMasterQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userMaster()
    t.field('findFirstUserMaster', {
      type: 'UserMaster',
      args: {
        where: 'UserMasterWhereInput',
        orderBy: arg({ type: 'UserMasterOrderByInput' }),
        cursor: 'UserMasterWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMaster.findFirst(args as any)
      },
    })
    t.crud.userMasters({ filtering: true, ordering: true })
    t.field('userMastersCount', {
      type: 'Int',
      args: {
        where: 'UserMasterWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userMaster.count(args as any)
      },
    })
  },
})

export const userMasterMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserMaster()
    t.crud.updateOneUserMaster()
    t.crud.upsertOneUserMaster()
    t.crud.deleteOneUserMaster()
    t.crud.updateManyUserMaster()
  },
})
