import { mutationField, list, nonNull, intArg, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import { create } from '../contact'

// export const CreateContactCustomFieldType = inputObjectType({
//   name: 'createContactCustomFieldType',
//   definition(t) {
//     t.nonNull.int('id')
//     t.nonNull.string('label')
//     t.nonNull.string('value')
//   },
// })

// export const LabelFieldType = inputObjectType({
//   name: 'labelFieldType',
//   definition(t) {
//     t.int('id')
//     t.nonNull.string('label')
//     t.string('color')
//   },
// })

// export const ContactPreferenceDataInput = inputObjectType({
//   name: 'ContactPreferenceDataInput',
//   definition(t) {
//     t.nonNull.int('family')
//     t.nonNull.int('emergency_contact')
//     t.nonNull.int('next_of_kin')
//     t.nonNull.int('insurance_provider')
//     t.nonNull.int('gp')
//     t.nonNull.int('company')
//     t.nonNull.int('book_appointments')
//     t.nonNull.int('book_class')
//     t.nonNull.int('loyalty')
//     t.nonNull.int('my_packages')
//     t.nonNull.int('purchase_package')
//     t.nonNull.int('payments')
//     t.nonNull.int('appointments')
//     t.nonNull.int('class')
//     t.nonNull.int('documents')
//     t.nonNull.int('medications')
//     t.nonNull.int('allergies')
//     t.nonNull.int('gp_details')
//     t.nonNull.string('share_link')
//     t.nonNull.string('access_code')
//   },
// })

// export const ContactDataInput = inputObjectType({
//   name: 'ContactDataInput',
//   definition(t) {
//     t.nonNull.string('Fname')
//     t.nonNull.string('Lname')
//     t.nonNull.string('Email')
//     t.nonNull.string('Salutation')
//     t.nonNull.string('MailingProvince')
//     t.nonNull.string('MailingCity')
//     t.nonNull.string('MailingStreet')
//     t.nonNull.string('MailingPostal')
//     t.nonNull.string('MailingCountry')
//     t.nonNull.int('MarketingOptInEmail')
//     t.nonNull.int('MarketingOptInPhone')
//     t.nonNull.int('MarketingOptInPost')
//     t.nonNull.int('MarketingOptInText')
//     t.nonNull.int('MarketingSource')
//     t.field('DOB', { type: 'DateTime' })
//     t.nonNull.string('Mobile')
//     t.nonNull.string('Phone')
//     t.nonNull.string('gender')
//     t.nonNull.string('preferred_language')
//     t.string('privacy_policy')
//     t.boolean('need_to_knows')
//   },
// })

// export const createContactAlert = mutationField('createContactAlert', {
//   type: 'ContactAlert',
//   args: {
//     data: nonNull('ContactDataInput'),
//     customFields: list('createContactCustomFieldType'),
//     limitContactLocations: list(intArg()),
//     labels: list('labelFieldType'),
//     contactPreferences: 'ContactPreferenceDataInput',
//   },
//   async resolve(_root, input, ctx: Context) {
//     const duplicateContacts = await ctx.prisma.cmContact.findMany({
//       where: {
//         Fname: { equals: input.data.Fname },
//         Lname: { equals: input.data.Lname },
//         Email: { equals: input.data.Email },
//         company_id: ctx.authenticated.company,
//       },
//     })

//     if (duplicateContacts.length > 0) {
//       throw new Error(`Duplicate contact exist`)
//     }

//     return await create(ctx, input)
//   },
// })

export const ContactAlertCreateOneMutationCustom = mutationField(
  'createContactAlertAdvanced',
  {
    type: nonNull('ContactAlert'),
    args: {
      data: nonNull('ContactAlertCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      console.info('here it is the data:', data.Note)

      const tags = data.Note?.split('#').splice(1)
      for (const tag of tags) {
        const tag_ = tag.split(' ')[0]
        console.info('tag', tag_)

        // model MedicalCondition {
        //   id         Int    @id @default(autoincrement())
        //   name       String
        //   company_id Int    @map("occupier")
        //   custom_id  String
        //   is_common  Int

        // model CmContactMedicalCondition {
        //   id                   Int              @id @default(autoincrement())
        //   company_id           Int
        //   contact_id           Int
        //   medical_condition_id Int
        //   medical_record_id    Int
        //   is_active            Boolean          @default(true)

        // const condition = prisma.MedicalCondition.upsert({
        //   where: {
        //     name: tag_,
        //   },
        //   create: {
        //     name: tag_,
        //     company_id: 8254,
        //     is_common: 0,
        //     custom_id: 'ok',
        //     Company: {
        //       connect: {
        //         id: 8254,
        //       },
        //     },
        //   },
        //   update: {},
        // update: {
        //   name: data.label,
        //   CmContactLabel: {
        //     create: {
        //       contact_id: contactId,
        //       company_id: companyId,
        //     },
        //   },
        // },
        // })
        // console.info('condition', condition)
      }

      // console.info(tags)
      return prisma.contactAlert.create({
        data,
        ...select,
      })
    },
  }
)
