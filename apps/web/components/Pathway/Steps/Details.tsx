import { Field, Form, Formik } from 'formik'

interface FormProps {
  someValue: string
}

interface P {
  onSubmit(data: FormProps & P['data']): void // This must be present for each Step
  data?: Record<string, any> // This must be present for each Step
}

export const Details = ({ onSubmit, data }: P) => (
  <>
    <h2>Check Details</h2>
    <h3>{JSON.stringify(data)}</h3>
    <Formik
      initialValues={data}
      validate={(values) => {
        const errors = {} as any
        if (!values.firstName) {
          errors.firstName = 'Required'
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
          <Field name="firstName" placeholder="firstName" />
          <input type="submit" disabled={!touched} />
        </Form>
      )}
    </Formik>
  </>
)
