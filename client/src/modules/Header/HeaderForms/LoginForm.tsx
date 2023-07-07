import axios from 'axios';
import { useFormik } from 'formik';
import React, { FC } from 'react';

import { LOGIN_URL } from '../../../config/config';
import { useAppDispatch } from '../../../store';
import { setToken } from '../../../store/tokenSlice';

type LoginFormProps = {
  onClose: () => void;
};

// const handleLogin = async (values: { email: string; password: string }, dispatch) => {
//   try {
//     const response = await axios.post(LOGIN_URL, values);

//     if (response.status === 200) {
//       const { token } = response.data;

//       // Store the token in localStorage
//     //   localStorage.setItem('token', token);

//       dispatch(setToken(token));

//       // Redirect or perform other actions
//     } else {
//       // Handle login error
//     }
//   } catch (error) {
//     // Handle error
//   }
// };

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const response = await axios.post(LOGIN_URL, values);

        if (response.status === 200) {
          const { token } = response.data;

          dispatch(setToken(token));
        } else {
          const { error } = response.data;
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }

      onClose();
    },
    validate: values => {
      const errors: any = {};

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`border rounded-md p-2 w-full ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && <div className="text-red-500 mt-1">{formik.errors.email}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={`border rounded-md p-2 w-full ${
            formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && <div className="text-red-500 mt-1">{formik.errors.password}</div>}
      </div>

      <div className="flex justify-end">
        <button type="button" className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
