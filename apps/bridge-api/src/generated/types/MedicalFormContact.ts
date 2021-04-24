import { objectType, arg, extendType } from 'nexus'

export const MedicalFormContact = objectType({
  name: 'MedicalFormContact',
  definition(t) {
    t.model.id()
    t.model.form_id()
    t.model.contact_id()
    t.model.created_at()
    t.model.updated_at()
    t.model.deleted_at()
    t.model.complete()
    t.model.locked()
    t.model.user_created()
    t.model.user_updated()
    t.model.related_to()
    t.model.custom_user_name()
    t.model.prescriber()
    t.model.priority()
    t.model.pharmacy_id()
    t.model.form_status()
    t.model.comments()
    t.model.urgent()
    t.model.imported()
    t.model.custom_contact_name()
    t.model.custom_contact_id()
    t.model.approved_triggers()
    t.model.actioned_by()
    t.model.form_contact_number()
    t.model.diagnosis_code()
    t.model.CmContact()
    t.model.CmContactTravel()
  },
})

export const medicalFormContactQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.medicalFormContact()
    t.field('findFirstMedicalFormContact', {
      type: 'MedicalFormContact',
      args: {
        where: 'MedicalFormContactWhereInput',
        orderBy: arg({ type: 'MedicalFormContactOrderByInput' }),
        cursor: 'MedicalFormContactWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalFormContact.findFirst(args as any)
      },
    })
    t.crud.medicalFormContacts({ filtering: true, ordering: true })
    t.field('medicalFormContactsCount', {
      type: 'Int',
      args: {
        where: 'MedicalFormContactWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalFormContact.count(args as any)
      },
    })
  },
})

export const medicalFormContactMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMedicalFormContact()
    t.crud.updateOneMedicalFormContact()
    t.crud.upsertOneMedicalFormContact()
    t.crud.deleteOneMedicalFormContact()
    t.crud.updateManyMedicalFormContact()
  },
})
