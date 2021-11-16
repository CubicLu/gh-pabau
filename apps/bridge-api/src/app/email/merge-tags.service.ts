import { Context } from 'vm'
import { EmailRelationsInput } from './dto'

export async function prepareMessage(
  html: string,
  ctx: Context,
  relation: EmailRelationsInput
): Promise<string> {
  console.info('relation', relation)

  const Contact = relation.contact_id
    ? await ctx.prisma.cmContact.findUnique({
        where: {
          ID: relation.contact_id,
        },
        include: {
          Insurance: true,
          InsuranceCompany: true,
          LoyaltyPoints: true,
          Booking: {
            where: { id: relation.booking_id },
          },
          InvSale: {
            where: { id: relation.invoice_id },
          },
        },
      })
    : null

  const Lead = relation.lead_id
    ? await ctx.prisma.cmLead.findUnique({
        where: {
          ID: relation.lead_id,
        },
        include: {
          CommunicationRecipient: {
            where: { recipient_type: 'LEAD' },
            select: {
              Communication: true,
            },
          },
        },
      })
    : null

  const User = relation.staff_id
    ? await ctx.prisma.user.findUnique({
        where: {
          id: relation.staff_id,
        },
        include: {
          CmStaffGeneral: true,
        },
      })
    : null

  const Company = await ctx.prisma.company.findUnique({
    where: {
      id: ctx.authenticated.company,
    },
  })

  console.info('Contact', Contact)
  console.info('Lead', Lead)
  console.info('User', User)

  const TAGS = {
    CLIENTEMAIL: Contact?.Email,
    CLIENTGENDER: Contact?.gender,
    CLIENTPHONE: Contact?.Phone,
    CLIENTMOBILE: Contact?.Mobile,
    CLIENTID: Contact?.custom_id,
    CLIENTSALUTATION: Contact?.Salutation,
    CLIENTCITY: Contact?.MailingCity,
    CLIENTCITY2: Contact?.OtherCity,
    CLIENTSTREET: Contact?.MailingStreet,
    CLIENTADDRESS2: Contact?.OtherStreet,
    CLIENTPOSTAL: Contact?.MailingPostal,
    CLIENTCOUNTY: Contact?.MailingProvince,
    CLIENTCOUNTRY: Contact?.MailingCountry,
    CLIENTMAILINGCOUNTRY: Contact?.MailingCountry,
    CLIENTLOYALTY: Contact?.LoyaltyPoints?.points,
    FULLADDRESS: function () {
      return [
        Contact?.MailingStreet,
        Contact?.OtherStreet,
        Contact?.MailingCity,
        Contact?.MailingPostal,
      ].join(',')
    },
    FULLADDRESS2: function () {
      return [
        Contact?.MailingStreet,
        Contact?.OtherStreet,
        Contact?.MailingCity,
        Contact?.MailingPostal,
        Contact?.OtherCity,
        Contact?.OtherPostal,
      ].join(',')
    },
    CLIENTDOB: function () {
      return Contact?.DOB ? new Date(Contact?.DOB).toLocaleDateString() : ''
    },
    CLIENT_INS_COMP: Contact?.Insurance?.insurer_name,
    CLIENT_INS_MEM_NUM: Contact?.ContactInsurance?.membership_number,
    CLIENT_INS_AUTH_CODE: Contact?.ContactInsurance?.auth_code,
    CLIENT_INS_MOBILE: Contact?.Insurance?.phone,
    CLIENT_INS_WEBSITE: Contact?.Insurance?.website,
    CLIENT_INS_CITY: Contact?.Insurance?.city,
    CLIENT_INS_STREET: Contact?.Insurance?.street,
    CLIENT_INS_COUNTY: Contact?.Insurance?.county,
    CLIENT_INS_POSTAL: Contact?.Insurance?.post_code,
    CLIENT_INS_EMAIL: Contact?.Insurance?.email,
    CLIENT_INS_IMAGE: Contact?.Insurance?.image,
    CLIENT_INS_COUNTRY: Contact?.Insurance?.country,
    CLIENT_INS_STREET2: Contact?.Insurance?.street2,
    CLIENT_INS_PROVIDERNUM: Contact?.ContactInsurance?.provider_number,
    APPOINTMENTFIRSTNAME: Contact?.Fname,
    APPOINTMENTLASTNAME: Contact?.Lname,
    CLIENT_PREFERENCES: function () {
      return [
        ctx.authenticated?.remote_url,
        '/modules/newsletters/update_preferences.php?company=',
        ctx.company_id,
        '&id=',
        relation.contact_id,
      ].join('')
    },
    CLIENTFORM: function () {
      return [
        ctx.authenticated?.remote_url,
        '/update_contact.php?compid=',
        ctx.company_id,
        '&id=',
        relation.contact_id,
      ].join('')
    },
    MEDICAL_FORM: function () {
      const medical_id = 1
      const encurl = [
        'form_id=',
        medical_id,
        '&contact_id=',
        relation.contact_id,
        '&gomode=1&company_id=',
        ctx.authenticated.company,
      ].join('')
      return [
        ctx.authenticated?.remote_url,
        '/pages/medical/medical_view_form.php?encurl=',
        btoa(encurl),
      ].join('')
    },
    NUMBER_OF_SESSIONS: async function () {
      const response = await ctx.prisma
        .$queryRaw`SELECT count(salon_bookings.id) AS count
            FROM cycle_appointment
            INNER JOIN salon_bookings ON cycle_appointment.appt_id=salon_bookings.id
            LEFT JOIN cycles ON cycles.id=cycle_appointment.cycle_id
            WHERE salon_bookings.contact_id = ${relation.contact_id ?? 0}
            AND salon_bookings.status != 'Cancelled' AND salon_bookings.end_date < NOW() AND cycles.id > 0 AND cycles.id != '' AND salon_bookings.occupier = ${
              ctx.authenticated.company
            }`
      return response[0]?.count ?? 0
    },
    DIAG_CODE: async function () {
      const response = await ctx.prisma.$queryRaw`SELECT icd_injury_code as code
                  FROM cycle_appointment
                  INNER JOIN salon_bookings ON cycle_appointment.appt_id=salon_bookings.id
                  INNER JOIN cycles ON cycles.id=cycle_appointment.cycle_id
                  LEFT JOIN diagnosis_code ON diagnosis_code.id=cycles.diagnosis_code_id
                  WHERE salon_bookings.occupier = ${
                    ctx.authenticated.company
                  } AND salon_bookings.contact_id = ${relation.contact_id ?? 0}
                  ORDER BY cycle_appointment.date_created DESC LIMIT 1`
      return response[0]?.code ?? ''
    },
    LEADNAME: function () {
      return [Lead?.Fname, Lead?.Lname].join(' ')
    },
    LEADFNAME: Lead?.Fname,
    LEADLNAME: Lead?.Lname,
    LEADTITLE: Lead?.Salutation,
    LEADEMAIL: Lead?.Email,
    LEADMOBILE: Lead?.Mobile,
    LEADPHONE: Lead?.Phone,
    YOURNAME: User?.full_name,
    LASTCALLDATE: function () {
      return new Date(Lead?.CommunicationRecipient[0]?.Communication[0]?.date)
        .toLocaleString()
        .slice(0, 9)
    },
    LASTCALLDATETIME: function () {
      return new Date(Lead?.CommunicationRecipient[0]?.Communication[0]?.date)
        .toLocaleString()
        .slice(0, 15)
    },
    STAFFIRSTNAME: User?.CmStaffGeneral?.Fname,
    STAFFLASTNAME: User?.CmStaffGeneral?.Lname,
    YOUREMAIL: User?.email,
    YOURTITLE: User?.job_title,
    STAFFMOBILE: User?.CmStaffGeneral?.CellPhone,
    STAFF_SIGNATURE: User?.signature,
    INVOICE_NUM: Contact?.InvSale[0]?.custom_id,
    INVOICE_URL: function () {
      return [
        ctx.authenticated?.remote_url,
        '/pages/contacts/invoice.php?id=',
        btoa(Contact?.InvSale[0]?.id.toString()),
        '&company_id=',
        ctx.authenticated.company_id,
      ].join(' ')
    },
    OUTSTANDING_AMOUNT: function () {
      return Contact?.InvSale[0]?.total - Contact?.InvSale[0]?.paid_amount
    },
    INVOICEDATE: Contact?.InvSale[0]?.date,
    COMPANYID: Company?.company_id,
    COMPANYNAME: Company?.company_name,
    COMPANYSITE: Company?.website,
    COMPANYCITY: Company?.site,
    COMPANYSTREET: Company?.street,
    COMPANYCOUNTRY: Company?.country,
    COMPANYPOSTAL: Company?.post_code,
    COMPANYCOUNTY: Company?.county,
    COMPANYPHONE: Company?.phone,
    COMPANYLOGO_IMG: Company?.logo,
    DATE: function () {
      //m-d-Y'
      return new Date().toLocaleDateString('en-US')
    },
    DATE2: function () {
      //'M-d-Y
      return new Date().toLocaleDateString('en-US')
    },
    DATEFULL: function () {
      //l jS \of F Y
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    DATETIME: function () {
      return new Date().toLocaleString().slice(0, 15)
    },
    TIME: function () {
      return new Date().toTimeString().slice(0, 5)
    },
    // APPOINTMENTMANAGE: Contact.MailingCountry, //=$connect_url_default."/index.php?compid=".$r_c['company_id']."&email=".$r_sbc['Email']."";
    // PACKAGE_NAME: Contact.MailingCountry, // get package name from booking_id
    APPOINTMENTNAME: function () {
      return [Contact?.Fname, Contact?.Lname].join(' ')
    },
    // ADATE: function () {
    //   return new Date().toTimeString().slice(0, 5)
    // },
    // ASTARTTIME: function () {
    //   return new Date().toTimeString().slice(0, 5)
    // },
    // AENDTIME: function () {
    //   return new Date().toTimeString().slice(0, 5)
    // },
    // AWEEKDAY:
    // ATYPE:
    // AWITH:
    // ALOCATIONNAME:
    // ALOCATIONADDRESS:
    // ALOCATIONCITY:
    // ALOCATIONPOSTAL:
    // ALOCATION_IMAGE:
    // RESCHEDULE_FROM_DATE:
    // RESCHEDULE_FROM_DATE_TIME:
    // RESCHEDULE_TO_DATE:
    // RESCHEDULE_TO_DATE_TIME:
    // ALOCATIONEMAIL:
    // ALOCATIONPHONE:
    // ALOCATIONWEB:
    // APPOINTMENTSTATUS: Contact.Booking?.status,
    // // APPOINTMENTCANCEL: Contact.Booking?.Reason.reason_name,
    // // APPOINTMENTROOM: Contact.Booking?.Reason.reason_name,
    // SOCIALSURVEY:
    // LINKSOCIALSURVEY:
    // FULL_APPT_DETAILS:
    // VIDEO_CONFERENCE:
    // SERVICE_CATEGORY:
    // MASTER_CATEGORY:
  }

  const HANDLE_REGEX = /\[.+?]/
  let result = []
  while ((result = HANDLE_REGEX.exec(html))) {
    const name = result[0]
    const name2 = name.slice(1, -1)
    html = html.replace(name, TAGS[name2] ?? '')
  }
  return html
}

// export const mergeTags = function (Contact: CmContact): void {
// this.CLIENTEMAIL = Contact.Email,
// this.CLIENTGENDER = Contact.gender,
// this.CLIENTDOB = function () {
//   return new Date(this.Contact.DOB).toLocaleDateString()
// }
// this.CLIENTPHONE= Contact.Phone,
// this.CLIENTMOBILE= Contact.Mobile,
// this.CLIENTID = Contact.custom_id,
// }
