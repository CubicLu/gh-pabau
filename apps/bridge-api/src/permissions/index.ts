import { allow, and, shield } from 'graphql-shield'
import * as rules from './types'

export const permissions = shield(
  {
    Mutation: {
      // Products
      createOneInvProduct: rules.authentication.isAuthenticated,
      //UserPermission
      updateOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      createOneUserPermission: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //StaffMeta
      createOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      updateOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOneStaffMeta: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //CompanyMeta
      setOneCompanyMeta: rules.authentication.isAdmin,
      setManyCompanyMeta: rules.authentication.isAdmin,

      //Update User Password
      updateUserPassword: rules.authentication.isAuthenticated,

      // Send Email
      sendEmail: rules.authentication.isAuthenticated,
      sendEmailTo: rules.authentication.isAuthenticated,

      //Page
      createOnePage: rules.authentication.isAuthenticated,
      updateOnePage: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      deleteOnePage: and(
        rules.authentication.isAuthenticated,
        rules.authentication.isAdmin
      ),
      //Country
      createOneCountry: rules.authentication.isAuthenticated,
      //MedicalFormContact
      createOneMedicalFormContact: rules.authentication.isAuthenticated,
      //CmContactNode
      createOneCmContactNote: rules.authentication.isAuthenticated,
      //UserGroup
      updateOneUserGroup: rules.authentication.isAdmin,
      deleteOneUserGroup: rules.authentication.isAdmin,

      // Send Email Without User Login
      sendEmailWithoutLogIn: allow,

      // Public access mutations
      login: allow,
      AuthenticateUser: allow,
      //resetPassword
      resetPassword: allow,
      upsertUserReportByReportCode: rules.authentication.isAdmin,

      //CompanyBranches
      createOneCompanyBranchWithAssignedStaff: rules.authentication.isAdmin,
      updateOneCompanyBranchWithAssignedStaff: rules.authentication.isAdmin,

      updateOneCompany: rules.authentication.isAdmin,
      updateManyUser: rules.authentication.isAdmin,
      upsertManyUsersPermissionByGroupId: rules.authentication.isAdmin,
      upsertManyUsersReportsByGroupId: rules.authentication.isAdmin,
      upsertGroupPermissionFeatureByGroupId: rules.authentication.isAdmin,
      updateManyInvBiller: rules.authentication.isAdmin,
      updateManyStaffMetaFeaturesByGroupId: rules.authentication.isAdmin,
      upsertManyUsersMainPermissionByGroupId: rules.authentication.isAdmin,

      // Default fallback
      '*': and(
        rules.authentication.isAuthenticated,
        rules.interceptors.injectCompany,
        rules.interceptors.injectUser
      ),
    },
    Query: {
      //StaffMeta
      findFirstStaffMeta: rules.authentication.isAuthenticated,
      findManyStaffMeta: rules.authentication.isAuthenticated,
      findManyStaffMetaCount: rules.authentication.isAuthenticated,
      // //UserGroup
      findManyUserGroupMemberCount: rules.authentication.isAuthenticated,
      findManyUserGroupMember: rules.authentication.isAuthenticated,
      findFirstUserGroupMember: rules.authentication.isAuthenticated,
      // //BnfDrug
      findFirstBnfDrug: rules.authentication.isAuthenticated,
      findManyBnfDrug: rules.authentication.isAuthenticated,
      findManyBnfDrugCount: rules.authentication.isAuthenticated,
      // //TrainingCourse
      findFirstTrainingCourse: rules.authentication.isAuthenticated,
      findManyTrainingCourse: rules.authentication.isAuthenticated,
      findManyTrainingCourseCount: rules.authentication.isAuthenticated,
      // //Page
      findFirstReport: rules.interceptors.interceptSharedCompanyData,
      findManyReport: rules.interceptors.interceptSharedCompanyData,
      findManyReportCount: rules.interceptors.interceptSharedCompanyData,
      retrieveReport: rules.authentication.isAuthenticated,
      retrieveTrendReport: rules.authentication.isAuthenticated,
      //ReportCategory
      findFirstReportCategory: rules.interceptors.interceptSharedCompanyData,
      findManyReportCategory: rules.interceptors.interceptSharedCompanyData,
      findManyReportCategoryCount:
        rules.interceptors.interceptSharedCompanyData,
      findFirstPage: rules.authentication.isAuthenticated,
      findManyPage: rules.authentication.isAuthenticated,
      findManyPageCount: rules.authentication.isAuthenticated,
      //InvPaymentType
      findManyInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      findManyInvPaymentTypeCount:
        rules.interceptors.interceptSharedCompanyData,
      findFirstInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      findUniqueInvPaymentType: rules.interceptors.interceptSharedCompanyData,
      // //CmContactNote
      findFirstCmContactNote: rules.authentication.isAuthenticated,
      findManyCmContactNote: rules.authentication.isAuthenticated,
      findManyCmContactNoteCount: rules.authentication.isAuthenticated,
      // //UserMainPermission
      findFirstUserMainPermission: rules.authentication.isAuthenticated,
      findManyUserMainPermission: rules.authentication.isAuthenticated,
      findManyUserMainPermissionCount: rules.authentication.isAuthenticated,
      // //UserAlert
      findFirstUserAlert: rules.authentication.isAuthenticated,
      findManyUserAlert: rules.authentication.isAuthenticated,
      findManyUserAlertCount: rules.authentication.isAuthenticated,
      // //UserAlertType
      findFirstUserAlertType: rules.authentication.isAuthenticated,
      findManyUserAlertType: rules.authentication.isAuthenticated,
      findManyUserAlertTypeCount: rules.authentication.isAuthenticated,
      // //SocialSurveyAnswer
      findFirstSocialSurveyAnswer: rules.authentication.isAuthenticated,
      findManySocialSurveyAnswer: rules.authentication.isAuthenticated,
      findManySocialSurveyAnswerCount: rules.authentication.isAuthenticated,
      // //Country
      findFirstCountry: rules.authentication.isAuthenticated,
      findManyCountry: rules.authentication.isAuthenticated,
      findManyCountryCount: rules.authentication.isAuthenticated,
      // //MedicalFormContact
      findFirstMedicalFormContact: rules.authentication.isAuthenticated,
      findManyMedicalFormContact: rules.authentication.isAuthenticated,
      findManyMedicalFormContactCount: rules.authentication.isAuthenticated,
      // //UserPermission
      findManyUserPermission: rules.authentication.isAuthenticated,
      findManyUserPermissionCount: rules.authentication.isAuthenticated,
      findFirstUserPermission: rules.authentication.isAuthenticated,
      findManyCmContact: rules.authentication.isAuthenticated,
      //Authentication
      findManyLocationsWithAvailableProductStock: rules.authentication.isAdmin,
      validateUser: allow,
      findManyProductsWithAvailableQuantity:
        rules.authentication.isAuthenticated,
      findManyProductsWithAvailableQuantityCount:
        rules.authentication.isAuthenticated,
      // //Authentication
      me: rules.authentication.isAuthenticated,
      company: rules.authentication.isAuthenticated,
      VerifyCredentials: allow,
      VerifyTwoFaCode: allow,
      ping: allow,
      // invoice
      getInvoiceData: rules.authentication.isAuthenticated,
      //TODO once jest mocks are resolved move it to rules.authentication.isAuthenticated
      featureRequestsWeeklyAvg: allow,
      '*': and(
        rules.authentication.isAuthenticated,
        rules.interceptors.interceptAccessToCompanyData
      ),
    },
  },
  {
    fallbackError: async (error: Error, _parent, args, _context, info) => {
      console.error(
        '\nThrown with args:',
        args,
        '\nResolver info :',
        info.path,
        '\nModel :',
        info.returnType,
        '\nError :',
        error
      )
      return error
    },
  }
)
