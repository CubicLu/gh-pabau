import { objectType, arg, extendType } from 'nexus'

export const MedicalForm = objectType({
  name: 'MedicalForm',
  definition(t) {
    t.model.id()
    t.model.user_deleted()
    t.model.name()
    t.model.data()
    t.model.created_at()
    t.model.updated_at()
    t.model.deleted_at()
    t.model.nhs_locum_id()
    t.model.nhs_procedure_id()
    t.model.locked()
    t.model.printout()
    t.model.company_id()
    t.model.user_created()
    t.model.encoded()
    t.model.form_type()
    t.model.service_id()
    t.model.ipad_only()
    t.model.heading_setting()
    t.model.temp_static()
    t.model.old_data()
    t.model.form_category()
    t.model.author()
    t.model.diagnosis_code()
    t.model.is_fav()
    t.model.diagnosis_code_enabled()
    t.model.lab_id()
    t.model.is_private()
  },
})

export const medicalFormQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.medicalForm()
    t.field('findFirstMedicalForm', {
      type: 'MedicalForm',
      args: {
        where: 'MedicalFormWhereInput',
        orderBy: arg({ type: 'MedicalFormOrderByInput' }),
        cursor: 'MedicalFormWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalForm.findFirst(args as any)
      },
    })
    t.crud.medicalForms({ filtering: true, ordering: true })
    t.field('medicalFormsCount', {
      type: 'Int',
      args: {
        where: 'MedicalFormWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.medicalForm.count(args as any)
      },
    })
  },
})

export const medicalFormMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneMedicalForm()
    t.crud.updateOneMedicalForm()
    t.crud.upsertOneMedicalForm()
    t.crud.deleteOneMedicalForm()
    t.crud.updateManyMedicalForm()
  },
})
