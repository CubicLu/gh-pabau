import { GetDetailsDocument, useSetDetailsMutation } from '@pabau/graphql'
import { Field, Form, Formik } from 'formik'

interface FormProps {
  Fname: string
  Lname: string
}

interface P {
  onSubmit(data: FormProps): void // This must be present for each Step
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
        onSubmit={(values) => {
          mutation()
          onSubmit?.(values)
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
