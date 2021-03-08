import { objectType, arg, extendType } from 'nexus'

export const ClassMaster = objectType({
  name: 'ClassMaster',
  definition(t) {
    t.model.cId()
    t.model.cCompanyid()
    t.model.cType()
    t.model.cTeacher()
    t.model.cLocation()
    t.model.cRoom()
    t.model.cSlots()
    t.model.cPrice()
    t.model.cDate()
    t.model.cTime()
    t.model.cDuration()
    t.model.cDay()
    t.model.cExptime()
    t.model.cBook()
    t.model.cEmpty()
    t.model.cFormattime()
    t.model.cStartformattime()
    t.model.classPay()
    t.model.cancelStatus()
    t.model.productId()
    t.model.signInType()
  },
})

export const classMasterQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.classMaster()
    t.field('findFirstClassMaster', {
      type: 'ClassMaster',
      args: {
        where: 'ClassMasterWhereInput',
        orderBy: arg({ type: 'ClassMasterOrderByInput' }),
        cursor: 'ClassMasterWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classMaster.findFirst(args as any)
      },
    })
    t.crud.classMasters({ filtering: true, ordering: true })
    t.field('classMastersCount', {
      type: 'Int',
      args: {
        where: 'ClassMasterWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.classMaster.count(args as any)
      },
    })
  },
})

export const classMasterMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneClassMaster()
    t.crud.updateOneClassMaster()
    t.crud.upsertOneClassMaster()
    t.crud.deleteOneClassMaster()
    t.crud.updateManyClassMaster()
    t.crud.deleteManyClassMaster()
  },
})
