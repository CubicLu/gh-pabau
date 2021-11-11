import {
  GetDetailsDocument,
  SetDetailsMutationOptions,
  useSetDetailsMutation,
} from '@pabau/graphql'
import { Field, Form, Formik } from 'formik'

interface P {
  onSubmit(data: SetDetailsMutationOptions['variables']): void // This must be present for each Step
  data?: Record<string, any> // This must be present for each Step
}

export const DetailsStep = ({ onSubmit, data }: P) => {
  const [mutation] = useSetDetailsMutation()

  return (
    <>
      <h2>Check Details</h2>
      <h3>{JSON.stringify(data)}</h3>
      <Formik
        initialValues={data['details']}
        validate={(values) => {
          const errors = {} as any
          if (!values.Fname) {
            errors.Fname = 'First Name is Required'
          }
          if (!values.Lname) {
            errors.Lname = 'Last Name is Required'
          }
          return errors
        }}
        onSubmit={async ({
          Fname,
          Lname,
          Phone,
          Salutation,
          gender,
          Email,
          Mobile,
          DOB,
          MailingStreet,
          MailingCountry,
          MailingCity,
        }) => {
          const variables: SetDetailsMutationOptions['variables'] = {
            contactId: data['contactId'],
            MailingCity,
            MailingCountry,
            DOB,
            Email,
            Fname,
            gender,
            Lname,
            Mobile,
            Phone,
            Salutation,
            MailingStreet,
          }
          await mutation({
            variables,
          })
          onSubmit?.(variables)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {errors && (
              <ul>
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
            )}
            <Field name="Fname" placeholder="First Name" />
            <Field name="Lname" placeholder="Last Name" />
            <input type="submit" disabled={!touched} />
          </Form>
        )}
      </Formik>
    </>
  )
}
DetailsStep.loadData = {
  document: GetDetailsDocument,
  variables: ({ contact_id }) => ({ contactId: contact_id }),
}
