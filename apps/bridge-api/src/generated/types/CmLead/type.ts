import { objectType } from 'nexus'

export const CmLead = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLead',
  definition(t) {
    t.int('ID')
    t.nullable.string('Avatar')
    t.int('OwnerID')
    t.nullable.int('ContactID')
    t.string('Salutation')
    t.string('Fname')
    t.string('Lname')
    t.nullable.field('DOB', { type: 'DateTime' })
    t.nullable.string('Title')
    t.nullable.string('LeadCompany')
    t.int('company_id')
    t.string('Email')
    t.string('Phone')
    t.nullable.string('Fax')
    t.string('Mobile')
    t.nullable.string('Website')
    t.int('LeadSource')
    t.int('LeadStatus')
    t.nullable.string('Industry')
    t.nullable.string('NoOfEmp')
    t.nullable.string('AnualRevenue')
    t.nullable.int('Rating')
    t.field('EmailOptOut', { type: 'cm_leads_EmailOptOut' })
    t.nullable.string('SkypeId')
    t.nullable.string('SecondaryEmail')
    t.nullable.string('Twitter')
    t.string('MailingStreet')
    t.string('MailingCity')
    t.string('MailingProvince')
    t.string('MailingPostal')
    t.string('MailingCountry')
    t.string('Description')
    t.field('EnumStatus', { type: 'cm_leads_EnumStatus' })
    t.field('Status', { type: 'cm_leads_Status' })
    t.nullable.field('CreatedDate', { type: 'DateTime' })
    t.nullable.int('MarketingOptInAll')
    t.int('MarketingOptInEmail')
    t.int('MarketingOptInPhone')
    t.int('MarketingOptInPost')
    t.int('MarketingOptInText')
    t.nullable.int('MarketingOptInNewsletter')
    t.nullable.string('IpAddress')
    t.nullable.string('fbimg')
    t.nullable.string('LastUpdated')
    t.nullable.string('custom_tag1')
    t.nullable.int('online_capture')
    t.nullable.int('capture_id')
    t.nullable.int('old_LeadStatus')
    t.nullable.string('custom_id')
    t.nullable.int('imported')
    t.nullable.field('ConvertDate', { type: 'DateTime' })
    t.nullable.int('group_id')
    t.nullable.field('first_interaction', { type: 'DateTime' })
    t.nullable.field('latest_interaction', { type: 'DateTime' })
    t.nullable.int('location_id')
    t.nullable.int('need_to_knows')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CmLeadCustomField', {
      type: 'CmLeadCustomField',
      args: {
        where: 'CmLeadCustomFieldWhereInput',
        orderBy: 'CmLeadCustomFieldOrderByInput',
        cursor: 'CmLeadCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomField
      },
    })
    t.list.field('CommunicationRecipient', {
      type: 'CommunicationRecipient',
      args: {
        where: 'CommunicationRecipientWhereInput',
        orderBy: 'CommunicationRecipientOrderByInput',
        cursor: 'CommunicationRecipientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationRecipientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationRecipient
      },
    })
    t.list.field('CmLeadNote', {
      type: 'CmLeadNote',
      args: {
        where: 'CmLeadNoteWhereInput',
        orderBy: 'CmLeadNoteOrderByInput',
        cursor: 'CmLeadNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadNote
      },
    })
    t.nullable.field('_count', {
      type: 'CmLeadCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
