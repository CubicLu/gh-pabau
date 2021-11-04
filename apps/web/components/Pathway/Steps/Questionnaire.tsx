import { GetDetailsQueryResult } from '@pabau/graphql'
import { Formik, Form, Field } from 'formik'

interface FormProps {
  testString?: string
}

interface P {
  onSubmit(data: FormProps & P['data']): void // This must be present for each Step
  //data?: Record<string, any> // This must be present for each Step
  data: GetDetailsQueryResult['data']['details'] // @@@
}

export const QuestionnaireStep = ({ onSubmit, data }: P) => (
  <>
    <h2>Questionnaire</h2>
    <h3>{JSON.stringify(data)}</h3>
    <Formik
      initialValues={data} // Only because data is flat we can do this. Otherwise we'd need to construct a flat object.
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
      onSubmit={(values) => onSubmit?.({ ...data, ...values })}
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
