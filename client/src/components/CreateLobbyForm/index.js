import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import * as FE from '../FormElements';

const formikEnhancer = withFormik({
  displayName: 'CreateLobbyForm',
  mapPropsToValues: props => ({ username: '', checkFetching: props.checkFetching }),
  // Validate form
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, 'Passwords need to be longer than that!')
      .required('Password is required!'),
  }),
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    props.login(values);
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
  <SC.Form onSubmit={handleSubmit}>
    <SC.FormField>
      <SC.Select
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      {touched.avatar && errors.avatar && <SC.Error>{errors.avatar}</SC.Error>}
    </SC.FormField>
    <p>{values.link}</p>
    <SC.Button type="submit" disabled={values.checkFetching()}>
      Join a game!
    </SC.Button>
  </SC.Form>
);


InnerForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    checkFetching: PropTypes.func,
  }).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};


export default formikEnhancer(InnerForm);

