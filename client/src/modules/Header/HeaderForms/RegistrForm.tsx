import axios from 'axios';
import bcrypt from 'bcryptjs';
import { REGISTER_URL, SALT } from 'config/config';
import { useFormik } from 'formik';
import React, { FC } from 'react';

type RegistrationFormProps = {
  onClose: () => void;
};

type RefistrData = {
  name: string;
  email: string;
  password: string;
};

type InputErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ onClose }) => {
  const handleSubmit = async (values: RefistrData) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, SALT);
      const payload = { ...values, password: hashedPassword };
      const response = await axios.post(REGISTER_URL, payload);

      if (response.status === 200) {
        const { message } = response.data;
        console.log(message);
      } else {
        const { error } = response.data;
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  const handleValidate = (values: RefistrData) => {
    const errors: InputErrors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

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
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`border rounded-md p-2 w-full ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && <div className="text-red-500 mt-1">{formik.errors.name}</div>}
      </div>

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
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
