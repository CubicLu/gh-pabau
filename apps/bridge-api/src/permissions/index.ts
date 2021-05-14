import { allow, and, rule, shield } from 'graphql-shield'
import { Context } from '../context'

const rules = {
  isAuthenticated: rule('isAuthenticated')(async (root, args, ctx: Context) => {
    console.log('isAuthenticated', ctx.req.body)
    return !!ctx?.req?.authenticatedUser
  }),
  isAdmin: rule('isAdmin')(
    async (root, args, ctx: Context): Promise<boolean> => {
      return ctx?.req?.authenticatedUser?.admin ?? false
    }
  ),
  belongsToCompanyAndShared: rule('belongsToCompanyAndShared')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      try {
        if (
          info.returnType.toString().startsWith('[') ||
          info.returnType.toString() === 'Int'
        ) {
          args.where = {
            ...args.where,
            company_id: { equals: ctx.req.authenticatedUser.company },
          }
          return true
        }
      } catch (error) {
        console.error('Error 28', error)
        return false
      }
    }
  ),
  isAccessingAuthenticatedCompany: rule('isAccessingAuthenticatedCompany')(
    async (root, args, ctx: Context): Promise<boolean> => {
      try {
        args.where = {
          ...args.where,
          id: { equals: ctx.req.authenticatedUser.company },
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  ),
  isAccessingReportData: rule('isAccessingReportData')(
    async (root, args, ctx: Context): Promise<boolean> => {
      try {
        args.where = {
          ...args.where,
          company_id: {
            in: [0, ctx.req.authenticatedUser.company],
          },
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  ),
  interceptMutation: rule('interceptMutation')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      if (info?.fieldName?.includes('create')) {
        if (args.data?.company?.connect?.id) {
          return (
            args.data?.company?.connect?.id ===
            ctx.req.authenticatedUser.company
          )
        } else if (args.data?.Company?.connect?.id) {
          return (
            args.data?.Company?.connect?.id ===
            ctx.req.authenticatedUser.company
          )
        } else if (args.data.company) {
          args.data = {
            ...args.data,
            company: {
              connect: { id: ctx.req.authenticatedUser.company },
            },
          }
          return true
        } else if (args.data.Company) {
          args.data = {
            ...args.data,
            Company: {
              connect: { id: ctx.req.authenticatedUser.company },
            },
          }
          return true
        }
        return false
      } else if (info?.fieldName?.includes('updateMany')) {
        if (args.where?.company_id) {
          return args.where?.company_id === ctx.req.authenticatedUser.company
        } else if (args.where.company) {
          args.where = {
            ...args.where,
            company: {
              id: { equals: ctx.req.authenticatedUser.company },
            },
          }
          return true
        } else if (args.where.Company) {
          args.where = {
            ...args.where,
            Company: {
              id: { equals: ctx.req.authenticatedUser.company },
            },
          }
          return true
        }
        return false
      }
      return true
    }
  ),
}
export const permissions = shield(
  {
    Mutation: {
      //UserPermission
      updateManyUserMainPermission: and(rules.isAuthenticated, rules.isAdmin),
      updateOneUserPermission: and(rules.isAuthenticated, rules.isAdmin),
      deleteOneUserPermission: and(rules.isAuthenticated, rules.isAdmin),
      createOneUserPermission: and(rules.isAuthenticated, rules.isAdmin),
      //StaffMeta
      createOneStaffMeta: and(rules.isAuthenticated, rules.isAdmin),
      updateOneStaffMeta: and(rules.isAuthenticated, rules.isAdmin),
      deleteOneStaffMeta: and(rules.isAuthenticated, rules.isAdmin),
      //CompanyMeta
      setOneCompanyMeta: and(rules.isAuthenticated, rules.isAdmin),
      //Page
      createOnePage: rules.isAuthenticated,
      updateOnePage: and(rules.isAuthenticated, rules.isAdmin),
      deleteOnePage: and(rules.isAuthenticated, rules.isAdmin),
      //Country
      createOneCountry: rules.isAuthenticated,
      //MedicalFormContact
      createOneMedicalFormContact: rules.isAuthenticated,
      //CmContactNode
      createOneCmContactNote: rules.isAuthenticated,
      //UserGroup
      createOneUserGroup: and(rules.isAuthenticated, rules.isAdmin),
      updateOneUserGroup: and(rules.isAuthenticated, rules.isAdmin),
      deleteOneUserGroup: and(rules.isAuthenticated, rules.isAdmin),
      //Pabau bespoke
      login: allow,
      logout: rules.isAuthenticated,
      upsertManyStaffMetaByGroupId: and(rules.isAuthenticated, rules.isAdmin),
      upsertUserReportByReportCode: and(rules.isAuthenticated, rules.isAdmin),
      '*': and(rules.isAuthenticated, rules.isAdmin, rules.interceptMutation),
    },
    Query: {
      //StaffMeta
      findFirstStaffMeta: rules.isAuthenticated,
      staffMeta: rules.isAuthenticated,
      staffMetas: rules.isAuthenticated,
      //UserGroup
      userGroupMembers: rules.isAuthenticated,
      userGroup: rules.isAuthenticated,
      findFirstUserGroupMember: rules.isAuthenticated,
      //Report
      findFirstReport: and(rules.isAuthenticated, rules.isAccessingReportData),
      reports: and(rules.isAuthenticated, rules.isAccessingReportData),
      retrieveReport: rules.isAuthenticated,
      retrieveTrendReport: rules.isAuthenticated,
      //ReportCategory
      findFirstReportCategory: and(
        rules.isAuthenticated,
        rules.isAccessingReportData
      ),
      reportCategories: and(rules.isAuthenticated, rules.isAccessingReportData),
      //BnfDrug
      bnfDrug: rules.isAuthenticated,
      bnfDrugs: rules.isAuthenticated,
      //TrainingCourse
      trainingCourses: rules.isAuthenticated,
      trainingCoursesCount: rules.isAuthenticated,
      //Page
      page: rules.isAuthenticated,
      pages: rules.isAuthenticated,
      findFirstPage: rules.isAuthenticated,
      //CmContactNote
      cmContactNotes: rules.isAuthenticated,
      //UserMainPermission
      userMainPermissions: rules.isAuthenticated,
      //UserAlert
      userAlerts: rules.isAuthenticated,
      //UserAlertType
      userAlertTypes: rules.isAuthenticated,
      //SocialSurveyAnswer
      socialSurveyAnswers: rules.isAuthenticated,
      //Country
      countries: rules.isAuthenticated,
      //MedicalFormContact
      medicalFormContacts: rules.isAuthenticated,
      //UserPermission
      userPermissions: rules.isAuthenticated,
      findFirstUserPermission: rules.isAuthenticated,
      //Authentication
      me: rules.isAuthenticated,
      company: rules.isAuthenticated,
      companies: and(
        rules.isAuthenticated,
        rules.isAccessingAuthenticatedCompany
      ),
      ping: allow,
      //TODO once jest mocks are resolved move it to rules.isAuthenticated
      featureRequestsWeeklyAvg: allow,
      findManyCustomReportWithPermissions: and(
        rules.isAuthenticated,
        rules.isAdmin
      ),
      user: rules.isAuthenticated, //TODO: insecure, fix in pure branch by masquerading the user/findOneUser and turning it into a findFirstUser in the shield injection.
      '*': and(rules.isAuthenticated, rules.belongsToCompanyAndShared),
    },
  },
  {
    fallbackError: async (thrownThing: Error, parent, args, context, info) => {
      console.error(
        '\nThrown with args:',
        args,
        '\nResolver info :',
        info.path,
        '\nReturn type',
        info.returnType
      )
      return thrownThing
    },
  }
)
