const formatDate = (date, to_time = 0) => {
  const formatted_date = new Date(
    date
      .toString()
      .replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$4:$5:$6 $2/$3/$1')
  )

  if (to_time) {
    return formatted_date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return formatted_date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getApptDuration = (start_date, end_date) => {
  const x: Date = new Date(start_date)
  const y: Date = new Date(end_date)
  return Math.floor((Number(y) - Number(x)) / 1000 / 60)
}

const getApptStatus = (start_date, status) => {
  if (status.toLowerCase() === 'cancelled') {
    return 'cancelled'
  }

  const appt_date = new Date(start_date)
  const inFuture =
    appt_date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
  if (inFuture) {
    return 'upcoming'
  }
  return 'past'
}

const formatAppts = (appts) => {
  return appts.map((appt) => {
    const formatted_start_date = formatDate(appt.start_date)
    const formatted_end_date = formatDate(appt.end_date)
    const formatted_start_time = formatDate(appt.start_date, 1)
    const formatted_end_time = formatDate(appt.end_date, 1)
    const appt_duration = getApptDuration(
      `${formatted_start_date} ${formatted_start_time}`,
      `${formatted_end_date} ${formatted_end_time}`
    )
    const appt_status = getApptStatus(formatted_start_date, appt.status)
    const temp_appt = {
      id: appt.id,
      doctor: {
        name: `${appt.CmStaffGeneral.Fname} ${appt.CmStaffGeneral.Lname}`,
        avatar: appt.CmStaffGeneral.Avatar,
        title: 'Hell of an Epic Practitioner.',
      },
      service: appt.service,
      date: formatted_start_date,
      time: formatted_start_time,
      time_to: formatted_end_time,
      duration: `${appt_duration} min.`,
      address_street: appt.CompanyBranch.street,
      address_postcode: appt.CompanyBranch.postcode,
      address_city: appt.CompanyBranch.city,
      status: appt_status,
      type: appt.where,
    }
    return temp_appt
  })
}

export const useApptFormatter = () => {
  return {
    formatAppts,
  }
}
