import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import * as SC from './StyledComponents';

const formikEnhancer = withFormik({
  displayName: 'JoinGameForm',
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
      <SC.Input
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      {touched.username && errors.username && <SC.Error>{errors.username}</SC.Error>}
    </SC.FormField>
    <SC.Button type="submit" disabled={values.checkLoading()}>
      Submit
    </SC.Button>
  </SC.Form>
);


InnerForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    checkLoading: PropTypes.func,
  }).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};


export default formikEnhancer(InnerForm);

