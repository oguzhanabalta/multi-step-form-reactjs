import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {Field, Form, Formik, FormikConfig, FormikValues} from 'formik';
import { CheckboxWithLabel, TextField} from 'formik-material-ui';
import { useState } from 'react';
import { object,mixed, number } from 'yup';
import React from 'react';


export default function Home() {
  return(
    <Card>
      <CardContent>
        <FormikStepper 
        validationSchema={object({
          money: mixed().when('millionere', {
            is: true,
            then: number().required().min(1_000_000, 'Beacuse you said you are millionaire you need to have 1 million'),
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
        

            <div>
                <Field name="firstName" component={TextField} label="First Name"/>
                <Field name="lastName" component={TextField} label="Last Name"/>
                <Field name="millionere" type="checkbox" component={CheckboxWithLabel} Label={{label: "I am a millionare"}}/>
            </div>
            <div>
                <Field name="money" type="number" component={TextField} label="Money"/>
            </div>
            <div>
               <Field name="description" component={TextField} label="Description"/>
            </div>
            
         
        </FormikStepper>
      </CardContent>
    </Card>

  )
}

export function FormikStepper({children,...props}: FormikConfig<FormikValues>){
    const childrenArray= React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild= childrenArray[step];

    function isLastStep(){
      return step === childrenArray.length -1;
    }

    return(
      <Formik {...props} onSubmit={async(values, helpers)=>{
          if(isLastStep()){
            await props.onSubmit(values, helpers);
          }else{
            setStep(s=> s+1);
          }
      }}>
        <Form autoComplete="off"> 
        {currentChild}

        { step > 0 ? <Button onClick={()=> setStep(s=> s-1)}>Back</Button> : null }
        <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
        </Form>
      </Formik>
    )

}