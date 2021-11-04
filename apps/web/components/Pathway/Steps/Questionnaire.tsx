import { GetDetailsQueryResult } from '@pabau/graphql'
import { Formik, Form, Field } from 'formik'

interface FormProps {
  testString?: string
}

interface P {
  onSubmit(data: FormProps): void // This must be present for each Step
  //data?: Record<string, any> // This must be present for each Step
  // data: GetDetailsQueryResult['data']['questionnaire'] // @@@
}

export const QuestionnaireStep = ({ onSubmit, data }: P) => (
  <>
    <h2>Questionnaire</h2>
    <h3>{JSON.stringify(data)}</h3>
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {} as any
        // if (!values.Fname) {
        //   errors.Fname = 'First Name is Required'
        // }
        // if (!values.Lname) {
        //   errors.Lname = 'Last Name is Required'
        // }
        return errors
      }}
      onSubmit={(values) => onSubmit?.(values)}
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
          <h2>Questionnaire goes here</h2>
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </>
)
