import { objectType } from 'nexus'

export const Company = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Company',
  definition(t) {
    t.int('id')
    t.string('user')
    t.int('digit8')
    t.int('admin')
    t.field('creation_date', { type: 'DateTime' })
    t.string('image')
    t.nullable.string('slug')
    t.nullable.string('remote_url')
    t.nullable.string('remote_connect')
    t.nullable.boolean('cron_enabled')
    t.nullable.field('details', {
      type: 'CompanyDetails',
      resolve(root: any) {
        return root.details
      },
    })
    t.nullable.field('subscription', {
      type: 'CompanySubscription',
      resolve(root: any) {
        return root.subscription
      },
    })
    t.list.field('TwoFactorHistory', {
      type: 'TwoFactorHistory',
      args: {
        where: 'TwoFactorHistoryWhereInput',
        orderBy: 'TwoFactorHistoryOrderByInput',
        cursor: 'TwoFactorHistoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TwoFactorHistoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TwoFactorHistory
      },
    })
    t.list.field('ThirdPartyAccess', {
      type: 'ThirdPartyAccess',
      args: {
        where: 'ThirdPartyAccessWhereInput',
        orderBy: 'ThirdPartyAccessOrderByInput',
        cursor: 'ThirdPartyAccessWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ThirdPartyAccessScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ThirdPartyAccess
      },
    })
    t.list.field('AcceptEmailToken', {
      type: 'AcceptEmailToken',
      args: {
        where: 'AcceptEmailTokenWhereInput',
        orderBy: 'AcceptEmailTokenOrderByInput',
        cursor: 'AcceptEmailTokenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AcceptEmailTokenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AcceptEmailToken
      },
    })
    t.list.field('AccountBalance', {
      type: 'AccountBalance',
      args: {
        where: 'AccountBalanceWhereInput',
        orderBy: 'AccountBalanceOrderByInput',
        cursor: 'AccountBalanceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalance
      },
    })
    t.list.field('MarketingSource', {
      type: 'MarketingSource',
      args: {
        where: 'MarketingSourceWhereInput',
        orderBy: 'MarketingSourceOrderByInput',
        cursor: 'MarketingSourceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MarketingSourceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MarketingSource
      },
    })
    t.list.field('CmCase', {
      type: 'CmCase',
      args: {
        where: 'CmCaseWhereInput',
        orderBy: 'CmCaseOrderByInput',
        cursor: 'CmCaseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCaseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCase
      },
    })
    t.list.field('CmCaseReply', {
      type: 'CmCaseReply',
      args: {
        where: 'CmCaseReplyWhereInput',
        orderBy: 'CmCaseReplyOrderByInput',
        cursor: 'CmCaseReplyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCaseReplyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCaseReply
      },
    })
    t.list.field('CmCampaign', {
      type: 'CmCampaign',
      args: {
        where: 'CmCampaignWhereInput',
        orderBy: 'CmCampaignOrderByInput',
        cursor: 'CmCampaignWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmCampaignScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmCampaign
      },
    })
    t.list.field('User', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('Candidate', {
      type: 'Candidate',
      args: {
        where: 'CandidateWhereInput',
        orderBy: 'CandidateOrderByInput',
        cursor: 'CandidateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CandidateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Candidate
      },
    })
    t.list.field('BookingStatus', {
      type: 'BookingStatus',
      args: {
        where: 'BookingStatusWhereInput',
        orderBy: 'BookingStatusOrderByInput',
        cursor: 'BookingStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookingStatus
      },
    })
    t.list.field('UserSalutation', {
      type: 'UserSalutation',
      args: {
        where: 'UserSalutationWhereInput',
        orderBy: 'UserSalutationOrderByInput',
        cursor: 'UserSalutationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserSalutationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserSalutation
      },
    })
    t.list.field('CompanyBranch', {
      type: 'CompanyBranch',
      args: {
        where: 'CompanyBranchWhereInput',
        orderBy: 'CompanyBranchOrderByInput',
        cursor: 'CompanyBranchWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
    t.list.field('CompanyLocation', {
      type: 'CompanyLocation',
      args: {
        where: 'CompanyLocationWhereInput',
        orderBy: 'CompanyLocationOrderByInput',
        cursor: 'CompanyLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyLocation
      },
    })
    t.list.field('CompanyRoom', {
      type: 'CompanyRoom',
      args: {
        where: 'CompanyRoomWhereInput',
        orderBy: 'CompanyRoomOrderByInput',
        cursor: 'CompanyRoomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoom
      },
    })
    t.list.field('CompanyRoomService', {
      type: 'CompanyRoomService',
      args: {
        where: 'CompanyRoomServiceWhereInput',
        orderBy: 'CompanyRoomServiceOrderByInput',
        cursor: 'CompanyRoomServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoomService
      },
    })
    t.list.field('CompanyService', {
      type: 'CompanyService',
      args: {
        where: 'CompanyServiceWhereInput',
        orderBy: 'CompanyServiceOrderByInput',
        cursor: 'CompanyServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.list.field('CompanyDepartment', {
      type: 'CompanyDepartment',
      args: {
        where: 'CompanyDepartmentWhereInput',
        orderBy: 'CompanyDepartmentOrderByInput',
        cursor: 'CompanyDepartmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyDepartmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyDepartment
      },
    })
    t.list.field('Job', {
      type: 'Job',
      args: {
        where: 'JobWhereInput',
        orderBy: 'JobOrderByInput',
        cursor: 'JobWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Job
      },
    })
    t.list.field('JobConfiguration', {
      type: 'JobConfiguration',
      args: {
        where: 'JobConfigurationWhereInput',
        orderBy: 'JobConfigurationOrderByInput',
        cursor: 'JobConfigurationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobConfigurationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobConfiguration
      },
    })
    t.list.field('JobOpening', {
      type: 'JobOpening',
      args: {
        where: 'JobOpeningWhereInput',
        orderBy: 'JobOpeningOrderByInput',
        cursor: 'JobOpeningWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobOpeningScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobOpening
      },
    })
    t.list.field('JobStatus', {
      type: 'JobStatus',
      args: {
        where: 'JobStatusWhereInput',
        orderBy: 'JobStatusOrderByInput',
        cursor: 'JobStatusWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'JobStatusScalarFieldEnum',
      },
      resolve(root: any) {
        return root.JobStatus
      },
    })
    t.list.field('PointOfSaleSetting', {
      type: 'PointOfSaleSetting',
      args: {
        where: 'PointOfSaleSettingWhereInput',
        orderBy: 'PointOfSaleSettingOrderByInput',
        cursor: 'PointOfSaleSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PointOfSaleSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PointOfSaleSetting
      },
    })
    t.list.field('BookingSetting', {
      type: 'BookingSetting',
      args: {
        where: 'BookingSettingWhereInput',
        orderBy: 'BookingSettingOrderByInput',
        cursor: 'BookingSettingWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookingSettingScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookingSetting
      },
    })
    t.list.field('AccountManager', {
      type: 'AccountManager',
      args: {
        where: 'AccountManagerWhereInput',
        orderBy: 'AccountManagerOrderByInput',
        cursor: 'AccountManagerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountManagerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountManager
      },
    })
    t.list.field('AcLog', {
      type: 'AcLog',
      args: {
        where: 'AcLogWhereInput',
        orderBy: 'AcLogOrderByInput',
        cursor: 'AcLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AcLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AcLog
      },
    })
    t.list.field('AppSubscriptionsCompanyPrice', {
      type: 'AppSubscriptionsCompanyPrice',
      args: {
        where: 'AppSubscriptionsCompanyPriceWhereInput',
        orderBy: 'AppSubscriptionsCompanyPriceOrderByInput',
        cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AppSubscriptionsCompanyPriceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AppSubscriptionsCompanyPrice
      },
    })
    t.list.field('AvilableDatesLog', {
      type: 'AvilableDatesLog',
      args: {
        where: 'AvilableDatesLogWhereInput',
        orderBy: 'AvilableDatesLogOrderByInput',
        cursor: 'AvilableDatesLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AvilableDatesLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AvilableDatesLog
      },
    })
    t.list.field('BlockReason', {
      type: 'BlockReason',
      args: {
        where: 'BlockReasonWhereInput',
        orderBy: 'BlockReasonOrderByInput',
        cursor: 'BlockReasonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BlockReasonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BlockReason
      },
    })
    t.list.field('BodyChartTemplate', {
      type: 'BodyChartTemplate',
      args: {
        where: 'BodyChartTemplateWhereInput',
        orderBy: 'BodyChartTemplateOrderByInput',
        cursor: 'BodyChartTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BodyChartTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BodyChartTemplate
      },
    })
    t.list.field('BookitProSlider', {
      type: 'BookitProSlider',
      args: {
        where: 'BookitProSliderWhereInput',
        orderBy: 'BookitProSliderOrderByInput',
        cursor: 'BookitProSliderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookitProSliderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookitProSlider
      },
    })
    t.list.field('CalendarView', {
      type: 'CalendarView',
      args: {
        where: 'CalendarViewWhereInput',
        orderBy: 'CalendarViewOrderByInput',
        cursor: 'CalendarViewWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CalendarViewScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CalendarView
      },
    })
    t.list.field('CampaignAttachment', {
      type: 'CampaignAttachment',
      args: {
        where: 'CampaignAttachmentWhereInput',
        orderBy: 'CampaignAttachmentOrderByInput',
        cursor: 'CampaignAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CampaignAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CampaignAttachment
      },
    })
    t.list.field('CancellationPolicy', {
      type: 'CancellationPolicy',
      args: {
        where: 'CancellationPolicyWhereInput',
        orderBy: 'CancellationPolicyOrderByInput',
        cursor: 'CancellationPolicyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CancellationPolicyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CancellationPolicy
      },
    })
    t.list.field('CancelReason', {
      type: 'CancelReason',
      args: {
        where: 'CancelReasonWhereInput',
        orderBy: 'CancelReasonOrderByInput',
        cursor: 'CancelReasonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CancelReasonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CancelReason
      },
    })
    t.list.field('ClassCategory', {
      type: 'ClassCategory',
      args: {
        where: 'ClassCategoryWhereInput',
        orderBy: 'ClassCategoryOrderByInput',
        cursor: 'ClassCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClassCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClassCategory
      },
    })
    t.list.field('ClassProduct', {
      type: 'ClassProduct',
      args: {
        where: 'ClassProductWhereInput',
        orderBy: 'ClassProductOrderByInput',
        cursor: 'ClassProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClassProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClassProduct
      },
    })
    t.list.field('ClockinLongpoll', {
      type: 'ClockinLongpoll',
      args: {
        where: 'ClockinLongpollWhereInput',
        orderBy: 'ClockinLongpollOrderByInput',
        cursor: 'ClockinLongpollWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ClockinLongpollScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ClockinLongpoll
      },
    })
    t.list.field('CmAppointmentsCustomImportHelper', {
      type: 'CmAppointmentsCustomImportHelper',
      args: {
        where: 'CmAppointmentsCustomImportHelperWhereInput',
        orderBy: 'CmAppointmentsCustomImportHelperOrderByInput',
        cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmAppointmentsCustomImportHelper
      },
    })
    t.list.field('CmAppointmentCustom', {
      type: 'CmAppointmentCustom',
      args: {
        where: 'CmAppointmentCustomWhereInput',
        orderBy: 'CmAppointmentCustomOrderByInput',
        cursor: 'CmAppointmentCustomWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmAppointmentCustomScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmAppointmentCustom
      },
    })
    t.list.field('CmContact', {
      type: 'CmContact',
      args: {
        where: 'CmContactWhereInput',
        orderBy: 'CmContactOrderByInput',
        cursor: 'CmContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContact
      },
    })
    t.list.field('CompanyMeta', {
      type: 'CompanyMeta',
      args: {
        where: 'CompanyMetaWhereInput',
        orderBy: 'CompanyMetaOrderByInput',
        cursor: 'CompanyMetaWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyMetaScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyMeta
      },
    })
    t.list.field('RotaShift', {
      type: 'RotaShift',
      args: {
        where: 'RotaShiftWhereInput',
        orderBy: 'RotaShiftOrderByInput',
        cursor: 'RotaShiftWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RotaShiftScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RotaShift
      },
    })
    t.list.field('PermissionTemplate', {
      type: 'PermissionTemplate',
      args: {
        where: 'PermissionTemplateWhereInput',
        orderBy: 'PermissionTemplateOrderByInput',
        cursor: 'PermissionTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PermissionTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PermissionTemplate
      },
    })
    t.list.field('UserGroup', {
      type: 'UserGroup',
      args: {
        where: 'UserGroupWhereInput',
        orderBy: 'UserGroupOrderByInput',
        cursor: 'UserGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserGroup
      },
    })
    t.list.field('UserMaster', {
      type: 'UserMaster',
      args: {
        where: 'UserMasterWhereInput',
        orderBy: 'UserMasterOrderByInput',
        cursor: 'UserMasterWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserMasterScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserMaster
      },
    })
    t.list.field('UserMobilePermission', {
      type: 'UserMobilePermission',
      args: {
        where: 'UserMobilePermissionWhereInput',
        orderBy: 'UserMobilePermissionOrderByInput',
        cursor: 'UserMobilePermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserMobilePermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserMobilePermission
      },
    })
    t.list.field('GroupPermission', {
      type: 'GroupPermission',
      args: {
        where: 'GroupPermissionWhereInput',
        orderBy: 'GroupPermissionOrderByInput',
        cursor: 'GroupPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'GroupPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.GroupPermission
      },
    })
    t.list.field('UserReport', {
      type: 'UserReport',
      args: {
        where: 'UserReportWhereInput',
        orderBy: 'UserReportOrderByInput',
        cursor: 'UserReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserReport
      },
    })
    t.list.field('InvBiller', {
      type: 'InvBiller',
      args: {
        where: 'InvBillerWhereInput',
        orderBy: 'InvBillerOrderByInput',
        cursor: 'InvBillerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvBillerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvBiller
      },
    })
    t.list.field('UserAlertPermission', {
      type: 'UserAlertPermission',
      args: {
        where: 'UserAlertPermissionWhereInput',
        orderBy: 'UserAlertPermissionOrderByInput',
        cursor: 'UserAlertPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserAlertPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserAlertPermission
      },
    })
    t.list.field('SocialSurvey', {
      type: 'SocialSurvey',
      args: {
        where: 'SocialSurveyWhereInput',
        orderBy: 'SocialSurveyOrderByInput',
        cursor: 'SocialSurveyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurvey
      },
    })
    t.list.field('SocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      args: {
        where: 'SocialSurveyFeedbackWhereInput',
        orderBy: 'SocialSurveyFeedbackOrderByInput',
        cursor: 'SocialSurveyFeedbackWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyFeedbackScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyFeedback
      },
    })
    t.list.field('SocialSurveyQuestion', {
      type: 'SocialSurveyQuestion',
      args: {
        where: 'SocialSurveyQuestionWhereInput',
        orderBy: 'SocialSurveyQuestionOrderByInput',
        cursor: 'SocialSurveyQuestionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyQuestionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyQuestion
      },
    })
    t.list.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      args: {
        where: 'CmStaffGeneralWhereInput',
        orderBy: 'CmStaffGeneralOrderByInput',
        cursor: 'CmStaffGeneralWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmStaffGeneralScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.list.field('HolidayRequest', {
      type: 'HolidayRequest',
      args: {
        where: 'HolidayRequestWhereInput',
        orderBy: 'HolidayRequestOrderByInput',
        cursor: 'HolidayRequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'HolidayRequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.HolidayRequest
      },
    })
    t.list.field('CompanyNote', {
      type: 'CompanyNote',
      args: {
        where: 'CompanyNoteWhereInput',
        orderBy: 'CompanyNoteOrderByInput',
        cursor: 'CompanyNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyNote
      },
    })
    t.list.field('AccountBalanceLog', {
      type: 'AccountBalanceLog',
      args: {
        where: 'AccountBalanceLogWhereInput',
        orderBy: 'AccountBalanceLogOrderByInput',
        cursor: 'AccountBalanceLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalanceLog
      },
    })
    t.list.field('HealthcodeInsurer', {
      type: 'HealthcodeInsurer',
      args: {
        where: 'HealthcodeInsurerWhereInput',
        orderBy: 'HealthcodeInsurerOrderByInput',
        cursor: 'HealthcodeInsurerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'HealthcodeInsurerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.HealthcodeInsurer
      },
    })
    t.list.field('InsuranceDetail', {
      type: 'InsuranceDetail',
      args: {
        where: 'InsuranceDetailWhereInput',
        orderBy: 'InsuranceDetailOrderByInput',
        cursor: 'InsuranceDetailWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InsuranceDetailScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InsuranceDetail
      },
    })
    t.list.field('CompanyPosition', {
      type: 'CompanyPosition',
      args: {
        where: 'CompanyPositionWhereInput',
        orderBy: 'CompanyPositionOrderByInput',
        cursor: 'CompanyPositionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPositionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPosition
      },
    })
    t.list.field('TrainCourseDate', {
      type: 'TrainCourseDate',
      args: {
        where: 'TrainCourseDateWhereInput',
        orderBy: 'TrainCourseDateOrderByInput',
        cursor: 'TrainCourseDateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TrainCourseDateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TrainCourseDate
      },
    })
    t.list.field('SocialSurveyFeedbackResponse', {
      type: 'SocialSurveyFeedbackResponse',
      args: {
        where: 'SocialSurveyFeedbackResponseWhereInput',
        orderBy: 'SocialSurveyFeedbackResponseOrderByInput',
        cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SocialSurveyFeedbackResponse
      },
    })
    t.list.field('XeroIntegration', {
      type: 'XeroIntegration',
      args: {
        where: 'XeroIntegrationWhereInput',
        orderBy: 'XeroIntegrationOrderByInput',
        cursor: 'XeroIntegrationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'XeroIntegrationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.XeroIntegration
      },
    })
    t.list.field('CmLead', {
      type: 'CmLead',
      args: {
        where: 'CmLeadWhereInput',
        orderBy: 'CmLeadOrderByInput',
        cursor: 'CmLeadWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLead
      },
    })
    t.list.field('CmContactJson', {
      type: 'CmContactJson',
      args: {
        where: 'CmContactJsonWhereInput',
        orderBy: 'CmContactJsonOrderByInput',
        cursor: 'CmContactJsonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactJsonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactJson
      },
    })
    t.list.field('CmContactLocation', {
      type: 'CmContactLocation',
      args: {
        where: 'CmContactLocationWhereInput',
        orderBy: 'CmContactLocationOrderByInput',
        cursor: 'CmContactLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLocation
      },
    })
    t.list.field('CmContactTravel', {
      type: 'CmContactTravel',
      args: {
        where: 'CmContactTravelWhereInput',
        orderBy: 'CmContactTravelOrderByInput',
        cursor: 'CmContactTravelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactTravelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactTravel
      },
    })
    t.list.field('CmContactViewed', {
      type: 'CmContactViewed',
      args: {
        where: 'CmContactViewedWhereInput',
        orderBy: 'CmContactViewedOrderByInput',
        cursor: 'CmContactViewedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactViewedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactViewed
      },
    })
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByInput',
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactMedicalCondition
      },
    })
    t.list.field('CmDrug', {
      type: 'CmDrug',
      args: {
        where: 'CmDrugWhereInput',
        orderBy: 'CmDrugOrderByInput',
        cursor: 'CmDrugWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmDrugScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmDrug
      },
    })
    t.list.field('InvProduct', {
      type: 'InvProduct',
      args: {
        where: 'InvProductWhereInput',
        orderBy: 'InvProductOrderByInput',
        cursor: 'InvProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvProduct
      },
    })
    t.list.field('CmExtraPatient', {
      type: 'CmExtraPatient',
      args: {
        where: 'CmExtraPatientWhereInput',
        orderBy: 'CmExtraPatientOrderByInput',
        cursor: 'CmExtraPatientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraPatientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraPatient
      },
    })
    t.list.field('CmExtraSalon', {
      type: 'CmExtraSalon',
      args: {
        where: 'CmExtraSalonWhereInput',
        orderBy: 'CmExtraSalonOrderByInput',
        cursor: 'CmExtraSalonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraSalonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraSalon
      },
    })
    t.list.field('CompanyPermission', {
      type: 'CompanyPermission',
      args: {
        where: 'CompanyPermissionWhereInput',
        orderBy: 'CompanyPermissionOrderByInput',
        cursor: 'CompanyPermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPermission
      },
    })
    t.list.field('CompanyPolicy', {
      type: 'CompanyPolicy',
      args: {
        where: 'CompanyPolicyWhereInput',
        orderBy: 'CompanyPolicyOrderByInput',
        cursor: 'CompanyPolicyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyPolicyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyPolicy
      },
    })
    t.list.field('InvPayment', {
      type: 'InvPayment',
      args: {
        where: 'InvPaymentWhereInput',
        orderBy: 'InvPaymentOrderByInput',
        cursor: 'InvPaymentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPayment
      },
    })
    t.list.field('BookitProGeneral', {
      type: 'BookitProGeneral',
      args: {
        where: 'BookitProGeneralWhereInput',
        orderBy: 'BookitProGeneralOrderByInput',
        cursor: 'BookitProGeneralWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'BookitProGeneralScalarFieldEnum',
      },
      resolve(root: any) {
        return root.BookitProGeneral
      },
    })
    t.list.field('MessageTemplate', {
      type: 'MessageTemplate',
      args: {
        where: 'MessageTemplateWhereInput',
        orderBy: 'MessageTemplateOrderByInput',
        cursor: 'MessageTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MessageTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MessageTemplate
      },
    })
    t.list.field('TemplateFolder', {
      type: 'TemplateFolder',
      args: {
        where: 'TemplateFolderWhereInput',
        orderBy: 'TemplateFolderOrderByInput',
        cursor: 'TemplateFolderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TemplateFolderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.TemplateFolder
      },
    })
    t.list.field('SmsPurchase', {
      type: 'SmsPurchase',
      args: {
        where: 'SmsPurchaseWhereInput',
        orderBy: 'SmsPurchaseOrderByInput',
        cursor: 'SmsPurchaseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SmsPurchaseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SmsPurchase
      },
    })
    t.list.field('UserActivityLog', {
      type: 'UserActivityLog',
      args: {
        where: 'UserActivityLogWhereInput',
        orderBy: 'UserActivityLogOrderByInput',
        cursor: 'UserActivityLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserActivityLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.UserActivityLog
      },
    })
    t.list.field('CmPurchaseOrder', {
      type: 'CmPurchaseOrder',
      args: {
        where: 'CmPurchaseOrderWhereInput',
        orderBy: 'CmPurchaseOrderOrderByInput',
        cursor: 'CmPurchaseOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmPurchaseOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmPurchaseOrder
      },
    })
    t.list.field('InventoryCount', {
      type: 'InventoryCount',
      args: {
        where: 'InventoryCountWhereInput',
        orderBy: 'InventoryCountOrderByInput',
        cursor: 'InventoryCountWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryCountScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryCount
      },
    })
    t.list.field('InventoryDiscrepancy', {
      type: 'InventoryDiscrepancy',
      args: {
        where: 'InventoryDiscrepancyWhereInput',
        orderBy: 'InventoryDiscrepancyOrderByInput',
        cursor: 'InventoryDiscrepancyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryDiscrepancyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryDiscrepancy
      },
    })
    t.list.field('InvPaymentType', {
      type: 'InvPaymentType',
      args: {
        where: 'InvPaymentTypeWhereInput',
        orderBy: 'InvPaymentTypeOrderByInput',
        cursor: 'InvPaymentTypeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentTypeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPaymentType
      },
    })
    t.list.field('ServicesMasterCategory', {
      type: 'ServicesMasterCategory',
      args: {
        where: 'ServicesMasterCategoryWhereInput',
        orderBy: 'ServicesMasterCategoryOrderByInput',
        cursor: 'ServicesMasterCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServicesMasterCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServicesMasterCategory
      },
    })
    t.list.field('InvWarehouseProduct', {
      type: 'InvWarehouseProduct',
      args: {
        where: 'InvWarehouseProductWhereInput',
        orderBy: 'InvWarehouseProductOrderByInput',
        cursor: 'InvWarehouseProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvWarehouseProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvWarehouseProduct
      },
    })
    t.list.field('FavoriteReport', {
      type: 'FavoriteReport',
      args: {
        where: 'FavoriteReportWhereInput',
        orderBy: 'FavoriteReportOrderByInput',
        cursor: 'FavoriteReportWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'FavoriteReportScalarFieldEnum',
      },
      resolve(root: any) {
        return root.FavoriteReport
      },
    })
    t.list.field('InvTaxRate', {
      type: 'InvTaxRate',
      args: {
        where: 'InvTaxRateWhereInput',
        orderBy: 'InvTaxRateOrderByInput',
        cursor: 'InvTaxRateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvTaxRateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvTaxRate
      },
    })
    t.list.field('Tax', {
      type: 'Tax',
      args: {
        where: 'TaxWhereInput',
        orderBy: 'TaxOrderByInput',
        cursor: 'TaxWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TaxScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Tax
      },
    })
    t.list.field('InvCategory', {
      type: 'InvCategory',
      args: {
        where: 'InvCategoryWhereInput',
        orderBy: 'InvCategoryOrderByInput',
        cursor: 'InvCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.list.field('ManageCustomField', {
      type: 'ManageCustomField',
      args: {
        where: 'ManageCustomFieldWhereInput',
        orderBy: 'ManageCustomFieldOrderByInput',
        cursor: 'ManageCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomField
      },
    })
    t.list.field('ManageCustomFieldCategory', {
      type: 'ManageCustomFieldCategory',
      args: {
        where: 'ManageCustomFieldCategoryWhereInput',
        orderBy: 'ManageCustomFieldCategoryOrderByInput',
        cursor: 'ManageCustomFieldCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomFieldCategory
      },
    })
    t.list.field('ManageCustomFieldItem', {
      type: 'ManageCustomFieldItem',
      args: {
        where: 'ManageCustomFieldItemWhereInput',
        orderBy: 'ManageCustomFieldItemOrderByInput',
        cursor: 'ManageCustomFieldItemWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldItemScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomFieldItem
      },
    })
    t.list.field('CmProductCustomField', {
      type: 'CmProductCustomField',
      args: {
        where: 'CmProductCustomFieldWhereInput',
        orderBy: 'CmProductCustomFieldOrderByInput',
        cursor: 'CmProductCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmProductCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmProductCustomField
      },
    })
    t.list.field('CompanyBranchGroup', {
      type: 'CompanyBranchGroup',
      args: {
        where: 'CompanyBranchGroupWhereInput',
        orderBy: 'CompanyBranchGroupOrderByInput',
        cursor: 'CompanyBranchGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranchGroup
      },
    })
    t.list.field('CompanyBranchAttachment', {
      type: 'CompanyBranchAttachment',
      args: {
        where: 'CompanyBranchAttachmentWhereInput',
        orderBy: 'CompanyBranchAttachmentOrderByInput',
        cursor: 'CompanyBranchAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyBranchAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyBranchAttachment
      },
    })
    t.list.field('SupplierCategory', {
      type: 'SupplierCategory',
      args: {
        where: 'SupplierCategoryWhereInput',
        orderBy: 'SupplierCategoryOrderByInput',
        cursor: 'SupplierCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SupplierCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.SupplierCategory
      },
    })
    t.list.field('InventoryMovement', {
      type: 'InventoryMovement',
      args: {
        where: 'InventoryMovementWhereInput',
        orderBy: 'InventoryMovementOrderByInput',
        cursor: 'InventoryMovementWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryMovementScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryMovement
      },
    })
    t.list.field('InvWarehouse', {
      type: 'InvWarehouse',
      args: {
        where: 'InvWarehouseWhereInput',
        orderBy: 'InvWarehouseOrderByInput',
        cursor: 'InvWarehouseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvWarehouseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvWarehouse
      },
    })
    t.list.field('InvSale', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.list.field('IssuingCompany', {
      type: 'IssuingCompany',
      args: {
        where: 'IssuingCompanyWhereInput',
        orderBy: 'IssuingCompanyOrderByInput',
        cursor: 'IssuingCompanyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'IssuingCompanyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.IssuingCompany
      },
    })
    t.list.field('DebtManageCommunication', {
      type: 'DebtManageCommunication',
      args: {
        where: 'DebtManageCommunicationWhereInput',
        orderBy: 'DebtManageCommunicationOrderByInput',
        cursor: 'DebtManageCommunicationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'DebtManageCommunicationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.DebtManageCommunication
      },
    })
    t.list.field('CreditNoteType', {
      type: 'CreditNoteType',
      args: {
        where: 'CreditNoteTypeWhereInput',
        orderBy: 'CreditNoteTypeOrderByInput',
        cursor: 'CreditNoteTypeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CreditNoteTypeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CreditNoteType
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
    t.list.field('CmLeadCustomFieldOrder', {
      type: 'CmLeadCustomFieldOrder',
      args: {
        where: 'CmLeadCustomFieldOrderWhereInput',
        orderBy: 'CmLeadCustomFieldOrderOrderByInput',
        cursor: 'CmLeadCustomFieldOrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldOrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomFieldOrder
      },
    })
    t.nullable.field('_count', {
      type: 'CompanyCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})