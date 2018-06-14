import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import * as FE from '../FormElements';

const formikEnhancer = withFormik({
  displayName: 'JoinGameForm',
  mapPropsToValues: props => ({ username: '', checkStatus: props.checkStatus }),
  // Validate form
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, 'Usernames need to be longer than that!')
      .required('Username is required!'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);
    setSubmitting(false);
  },
});


const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <FE.Form onSubmit={handleSubmit}>
    <FE.FormField>
      <FE.Input
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      {touched.username && errors.username && <FE.Error>{errors.username}</FE.Error>}
    </FE.FormField>
    <FE.Button type="submit" disabled={!values.checkStatus()}>
      Join a game!
    </FE.Button>
  </FE.Form>
);


InnerForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    checkStatus: PropTypes.func,
  }).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};


export default formikEnhancer(InnerForm);

