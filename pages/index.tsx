import {Card, CardContent, Typography} from '@material-ui/core';
import {Field, Form, Formik} from 'formik';
import { CheckboxWithLabel, TextField} from 'formik-material-ui';
import { object,mixed, number } from 'yup';


export default function Home() {
  return(
    <Card>
      <CardContent>
        <Formik 
        validationSchema={object({
          money: mixed().when('millionere', {
            is: true,
            then: number().required().min(1_000_000),
            otherwise: number().required()

          }) 
        })}
        initialValues={{
          firstName: '',
          lastName: '',
          millionere: false,
          money: 0,
          description: ''
        }} onSubmit={()=>{}}>
          <Form autoComplete="off">
            <Field name="firstName" component={TextField} label="First Name"/>
            <Field name="lastName" component={TextField} label="Last Name"/>
            <Field name="millionere" type="checkbox" component={CheckboxWithLabel} Label={{label: "I am a millionare"}}/>
            <Field name="money" type="number" component={TextField} label="Money"/>
            <Field name="description" component={TextField} label="Description"/>
          </Form>
        </Formik>
      </CardContent>
    </Card>

  )
}