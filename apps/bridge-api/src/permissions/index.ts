import { allow, and, shield } from 'graphql-shield'
import * as rules from './types'

export const permissions = shield(
  {
    Mutation: {
      //UserPermission
      updateOneUserPermission: rules.authentication.isAdmin,
      deleteOneUserPermission: rules.authentication.isAdmin,
      createOneUserPermission: rules.authentication.isAdmin,

      //StaffMeta
      createOneStaffMeta: rules.authentication.isAdmin,
      updateOneStaffMeta: rules.authentication.isAdmin,
      deleteOneStaffMeta: rules.authentication.isAdmin,
      upsertManyStaffMetaByGroupId: rules.authentication.isAdmin,

      //CompanyMeta
      setOneCompanyMeta: rules.authentication.isAdmin,

      //Page
      updateOnePage: rules.authentication.isAdmin,
      deleteOnePage: rules.authentication.isAdmin,

      //UserGroup
      createOneUserGroup: rules.authentication.isAdmin,
      updateOneUserGroup: rules.authentication.isAdmin,
      deleteOneUserGroup: rules.authentication.isAdmin,

      // Public access mutations
      login: allow,

      // Default fallback
      '*': and(
        rules.authentication.isAdmin,
        rules.interceptors.interceptMutation
      ),
    },
    Query: {
      findFirstStaffMeta: rules.authentication.isAuthenticated,
      staffMeta: rules.authentication.isAuthenticated,
      staffMetas: rules.authentication.isAuthenticated,
      //UserGroup
      userGroupMembers: rules.authentication.isAuthenticated,
      userGroup: rules.authentication.isAuthenticated,
      findFirstUserGroupMember: rules.authentication.isAuthenticated,
      //Report
      findFirstReport: rules.interceptors.interceptSharedCompanyData,
      reports: rules.interceptors.interceptSharedCompanyData,
      retrieveReport: rules.authentication.isAuthenticated,
      retrieveTrendReport: rules.authentication.isAuthenticated,
      //ReportCategory
      findFirstReportCategory: rules.interceptors.interceptSharedCompanyData,
      reportCategories: rules.interceptors.interceptSharedCompanyData,
      //BnfDrug
      bnfDrug: rules.authentication.isAuthenticated,
      bnfDrugs: rules.authentication.isAuthenticated,
      //TrainingCourse
      trainingCourses: rules.authentication.isAuthenticated,
      trainingCoursesCount: rules.authentication.isAuthenticated,
      //Page
      page: rules.authentication.isAuthenticated,
      pages: rules.authentication.isAuthenticated,
      findFirstPage: rules.authentication.isAuthenticated,
      //CmContactNote
      cmContactNotes: rules.authentication.isAuthenticated,
      //UserMainPermission
      userMainPermissions: rules.authentication.isAuthenticated,
      //UserAlert
      userAlerts: rules.authentication.isAuthenticated,
      //UserAlertType
      userAlertTypes: rules.authentication.isAuthenticated,
      //SocialSurveyAnswer
      socialSurveyAnswers: rules.authentication.isAuthenticated,
      //Country
      countries: rules.authentication.isAuthenticated,
      //MedicalFormContact
      medicalFormContacts: rules.authentication.isAuthenticated,
      //UserPermission
      userPermissions: rules.authentication.isAuthenticated,
      findFirstUserPermission: rules.authentication.isAuthenticated,
      //Authentication
      me: rules.authentication.isAuthenticated,
      company: rules.authentication.isAuthenticated,
      ping: allow,
      //TODO once jest mocks are resolved move it to rules.authentication.isAuthenticated
      featureRequestsWeeklyAvg: allow,
      findManyCustomReportWithPermissions: rules.authentication.isAdmin,
      user: rules.authentication.isAuthenticated, //TODO: insecure, fix in pure branch by masquerading the user/findOneUser and turning it into a findFirstUser in the shield injection.
      staffList: rules.authentication.isAuthenticated,
      '*': rules.interceptors.interceptAccessToCompanyData,
    },
  },
  {
    fallbackError: async (error: Error, _parent, args, _context, info) => {
      console.error(
        '\nThrown with args:',
        args,
        '\nResolver info :',
        info.path,
        '\nReturn type',
        info.returnType
      )
      return error
    },
  }
)
