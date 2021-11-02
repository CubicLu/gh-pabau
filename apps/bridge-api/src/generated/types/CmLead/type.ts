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
    t.nullable.int('pipeline_stage_id')
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
        orderBy: 'CmLeadCustomFieldOrderByWithRelationInput',
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
        orderBy: 'CommunicationRecipientOrderByWithRelationInput',
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
        orderBy: 'CmLeadNoteOrderByWithRelationInput',
        cursor: 'CmLeadNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadNote
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('Activity', {
      type: 'Activity',
      args: {
        where: 'ActivityWhereInput',
        orderBy: 'ActivityOrderByWithRelationInput',
        cursor: 'ActivityWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Activity
      },
    })
    t.nullable.field('MarketingSource', {
      type: 'MarketingSource',
      resolve(root: any) {
        return root.MarketingSource
      },
    })
    t.nullable.field('LeadStatusData', {
      type: 'LeadStatus',
      resolve(root: any) {
        return root.LeadStatusData
      },
    })
    t.nullable.field('PipelineStage', {
      type: 'PipelineStage',
      resolve(root: any) {
        return root.PipelineStage
      },
    })
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
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
