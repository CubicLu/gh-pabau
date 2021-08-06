import { mutationField, list, nonNull, intArg, inputObjectType } from 'nexus'
import { Context } from '../../../context'
import { create } from '../contact'

export const CreateContactCustomFieldType = inputObjectType({
  name: 'createContactCustomFieldType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('label')
    t.nonNull.string('value')
  },
})

export const LabelFieldType = inputObjectType({
  name: 'labelFieldType',
  definition(t) {
    t.int('id')
    t.nonNull.string('label')
    t.string('color')
  },
})

export const ContactDataInput = inputObjectType({
  name: 'ContactDataInput',
  definition(t) {
    t.nonNull.string('Fname')
    t.nonNull.string('Lname')
    t.nonNull.string('Email')
    t.nonNull.string('Salutation')
    t.nonNull.string('MailingProvince')
    t.nonNull.string('MailingCity')
    t.nonNull.string('MailingStreet')
    t.nonNull.string('MailingPostal')
    t.nonNull.string('MailingCountry')
    t.nonNull.int('MarketingOptInEmail')
    t.nonNull.int('MarketingOptInPhone')
    t.nonNull.int('MarketingOptInPost')
    t.nonNull.int('MarketingOptInText')
    t.nonNull.int('MarketingSource')
    t.field('DOB', { type: 'DateTime' })
    t.nonNull.string('Mobile')
    t.nonNull.string('Phone')
    t.nonNull.string('gender')
    t.nonNull.string('preferred_language')
  },
})

export const createContact = mutationField('createOneContact', {
  type: list('CmContact'),
  args: {
    data: nonNull('ContactDataInput'),
    customFields: list('createContactCustomFieldType'),
    limitContactLocations: list(intArg()),
    otherCompanyIds: list(intArg()),
    labels: list('labelFieldType'),
  },
  async resolve(_root, input, ctx: Context) {
    const duplicateContacts = await ctx.prisma.cmContact.findMany({
      where: {
        Fname: { equals: input.data.Fname },
        Lname: { equals: input.data.Lname },
        company_id: ctx.authenticated.company,
      },
    })

    if (duplicateContacts.length > 0) {
      throw new Error(`Duplicate contact exist`)
    }

    return await create(ctx, input)
  },
})
