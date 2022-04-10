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

export default function AddStudentForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handlePostQuery( name,studentID) {
    var myParams = {
      studentID: studentID,
      studentName: name
    };
    console.log('here', myParams);
    alert('Student added!')
    navigate('/dashboard/app');
    // axios
    //   .post('addStudent', myParams)
    //   .then(function (response) {
    //     console.log('response', response);
    //     navigate('/dashboard/app');
    //     console.log('response data :', response.data);
    //       // Perform action based on response
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     // Perform action based on error
    //   });
  }
  async function addStudent() {
    try {
      setError('');
      console.log('Inside addStudent onclick',formik);
      await handlePostQuery(formik.values.name, formik.values.studentID);
    } catch {
      setError('Failed to choose values!');
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    studentID: Yup.string().required('Student ID is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      firstName: '',
      lastName: '',
      studentID: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      addStudent()
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            // type="email"
            label="Student ID"
            {...getFieldProps('studentID')}
            error={Boolean(touched.studentID && errors.studentID)}
            helperText={touched.studentID && errors.studentID}
          />

          {/* <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          /> */}

          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={addStudent}
          >
            Add Student
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
