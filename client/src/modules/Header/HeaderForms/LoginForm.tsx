import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useFormik } from 'formik';
import React, { FC } from 'react';

import { LOGIN_URL, SALT } from '../../../config/config';
import { useAppDispatch } from '../../../store';
import { setToken } from '../../../store/tokenSlice';

type LoginFormProps = {
  onClose: () => void;
};

type LoginData = {
  email: string;
  password: string;
};

type InputErrors = {
  email?: string;
  password?: string;
};

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: LoginData) => {
    try {
      const { email, password } = values;
      const hashedPassword = await bcrypt.hash(password, SALT);
      const response = await axios.post(LOGIN_URL, { email, password: hashedPassword });

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
  };

  const handleValidate = (values: LoginData) => {
    const errors: InputErrors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validate: handleValidate,
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
