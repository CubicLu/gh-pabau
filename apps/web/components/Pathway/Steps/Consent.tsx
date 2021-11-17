import { Formik, Form, Field } from 'formik'

interface FormProps {
  testString?: string
}

interface P {
  onSubmit(data: FormProps & P['data']): void // This must be present for each Step
  data?: Record<string, any> // This must be present for each Step
}

export const ConsentStep = ({ onSubmit, data }: P) => (
  <>
    <h2>Consent Forms</h2>
    <h3>{JSON.stringify(data.selectedConsentIds)}</h3>
    <Formik
      initialValues={{ consents: data.selectedConsentIds }}
      validate={(values) => {
        const errors = {} as any
        // if (!values.testString) {
        //   errors.testString = 'Required'
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
          <Field name="testString" placeholder="Test String" />
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </>
)
