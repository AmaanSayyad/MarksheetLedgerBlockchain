
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import axios from '../../../axios';

// ----------------------------------------------------------------------

export default function AddMarksForm() {
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handlePostQuery(marksheetID,subjectName, marksObtained,totalMarks,status) {
    var myParams = {
      marksheetID,
      subjectName, 
      marksObtained,
      totalMarks,
      status
    };
    console.log('here', myParams);
    axios
      .post('addMarks', myParams)
      .then(function (response) {
        console.log('response', response);
        navigate('/dashboard/app');
        console.log('response data :', response.data);
          // Perform action based on response
      })
      .catch(function (error) {
        console.log(error);
        // Perform action based on error
      });
  }
  async function addMarks() {
    try {
      setError('');
      console.log('Inside addStudent onclick',formik);
      await handlePostQuery(formik.values.marksheetID, formik.values.subjectName, formik.values.marksObtained,formik.values.totalMarks,formik.values.status);
    } catch {
      setError('Failed to choose values!');
    }
  }


  const RegisterSchema = Yup.object().shape({
    marksheetID:Yup.string().required('marksheet id is required'),
    subjectName: Yup.string().required('Subject name is required'),
    marksObtained: Yup.string().required('Marks is required'),
    totalMarks: Yup.string().required('Total title is required'),
    status: Yup.string().required('Status is required'),   
    name:Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name required'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    studentID: Yup.string().required('Student ID is required'),
    marksheetTitle: Yup.string().required('Marksheet title is required'),
    totalSub: Yup.string().required('Total subjects is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      marksheetID:'',
      subjectName:'',
      marksObtained:'',
      totalMarks:'',
      status:'',
      name:'',
      firstName: '',
      lastName: '',
      studentID:'',
      marksheetTitle:'',
      totalSub:'',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
 
       <TextField
            fullWidth
            autoComplete="username"
            // type="email"
            label="Marksheet ID"
            {...getFieldProps('marksheetID')}
            error={Boolean(touched.marksheetID && errors.marksheetID)}
            helperText={touched.marksheetID && errors.marksheetID}
          />
           <TextField
              fullWidth
              label="Subject name"
              {...getFieldProps('subjectName')}
              error={Boolean(touched.subjectName && errors.subjectName)}
              helperText={touched.subjectName && errors.subjectName}
            />
           <TextField
              fullWidth
              label="Marks Obtained"
              type="number"
              {...getFieldProps('marksObtained')}
              error={Boolean(touched.marksObtained && errors.marksObtained)}
              helperText={touched.marksObtained && errors.marksObtained}
            />
           <TextField
              fullWidth
              label="Total Marks"
              {...getFieldProps('totalMarks')}
              error={Boolean(touched.totalMarks && errors.totalMarks)}
              helperText={touched.totalMarks && errors.totalMarks}
            />
           <TextField
              fullWidth
              label="Status (Pass/Fail)"
    
              {...getFieldProps('status')}
              error={Boolean(touched.status && errors.status)}
              helperText={touched.status && errors.status}
            />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={addMarks}
          >
            Add marks in the marksheet
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
