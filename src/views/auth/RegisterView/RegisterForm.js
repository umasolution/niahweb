import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Icon } from '@iconify/react';
import {
  Box,
  TextField,
  makeStyles, 
  Grid
} from '@material-ui/core';
import {  Stack, InputAdornment,IconButton } from '@mui/material';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';
import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {},
  input:{color:'#000 !important'}
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCodeChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        policy: true,
       
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('First name is required'),
        lastName: Yup.string().max(255).required('Last name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),
        // policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(register(values));
          onSubmitSuccess();
        } catch (error) {
          console.log(error);
          const message = error || 'Something went wrong';
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                className={classes.input}
                onBlur={handleBlur}
                onChange={handleChange}
                type="firstName"
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                className={classes.input}
                onBlur={handleBlur}
                onChange={handleChange}
                type="lastName"
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            className={classes.input}
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            className={classes.input}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
       
          {/* {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )} */}
          <Box mt={2}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Register
            </LoadingButton>
          </Box>
        </Stack>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
