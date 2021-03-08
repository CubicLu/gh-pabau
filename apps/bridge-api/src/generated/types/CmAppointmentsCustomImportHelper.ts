import { objectType, arg, extendType } from 'nexus'

export const CmAppointmentsCustomImportHelper = objectType({
  name: 'CmAppointmentsCustomImportHelper',
  definition(t) {
    t.model.id()
    t.model.occupier()
    t.model.customAppointmentId()
    t.model.customContactName()
    t.model.customFieldName()
    t.model.customFieldValue()
    t.model.added()
    t.model.appointmentId()
  },
})

export const cmAppointmentsCustomImportHelperQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmAppointmentsCustomImportHelper()
    t.field('findFirstCmAppointmentsCustomImportHelper', {
      type: 'CmAppointmentsCustomImportHelper',
      args: {
        where: 'CmAppointmentsCustomImportHelperWhereInput',
        orderBy: arg({ type: 'CmAppointmentsCustomImportHelperOrderByInput' }),
        cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmAppointmentsCustomImportHelper.findFirst(
          args as any,
        )
      },
    })
    t.crud.cmAppointmentsCustomImportHelpers({
      filtering: true,
      ordering: true,
    })
    t.field('cmAppointmentsCustomImportHelpersCount', {
      type: 'Int',
      args: {
        where: 'CmAppointmentsCustomImportHelperWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmAppointmentsCustomImportHelper.count(args as any)
      },
    })
  },
})

export const cmAppointmentsCustomImportHelperMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmAppointmentsCustomImportHelper()
    t.crud.updateOneCmAppointmentsCustomImportHelper()
    t.crud.upsertOneCmAppointmentsCustomImportHelper()
    t.crud.deleteOneCmAppointmentsCustomImportHelper()
    t.crud.updateManyCmAppointmentsCustomImportHelper()
    t.crud.deleteManyCmAppointmentsCustomImportHelper()
  },
})
