import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useGetStaffDetailsQuery } from '@pabau/graphql'
import { StaffDetails } from '../../../components/team/User/Index'
import Index from '../../../components/team/User/Index'

const GetUserDetails = () => {
  const router = useRouter()
  const staffId = Number(router.query['id'])
  const [staffDetails, setStaffDetails] = useState<StaffDetails>()

  const queryVariable = useMemo(() => {
    return { userID: staffId }
  }, [staffId])
  const {
    data: staffData,
    loading: staffDataLoading,
  } = useGetStaffDetailsQuery({
    variables: queryVariable,
    skip: !staffId,
  })
  useEffect(() => {
    const response = staffData?.findUniqueUser
    if (response) {
      const staff = {
        ...response.Staff,
        image: response.image,
        staffTitle: response.job_title,
      }
      const { PrimaryLocation, ...rest } = staff
      setStaffDetails({
        ...rest,
        firstname: staff.Fname,
        lastname: staff.Lname,
        email: staff.Email,
        mobilePhone: staff.CellPhone,
        birthday: staff.Birthdate,
        employmentStartDate: staff.CreatedDate,
        primaryLocation: PrimaryLocation?.id,
        primaryLocationName: PrimaryLocation?.name,
        otherLocations: [
          ...staff.OtherLocations.map((d) => d.id),
          PrimaryLocation?.id,
        ],
        notes: staff.StaffNote?.[0]?.note,
      })
    }
  }, [staffData])
  return (
    <Index
      personalData={staffDetails}
      userId={staffId}
      staffDataLoading={staffDataLoading}
    />
  )
}
export default GetUserDetails
