"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post("/api/registration", {
        email: values.email,
        password: values.password,
      });

      if (res.status === 201) {
        const signInRes = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (signInRes?.error) {
          setError("Failed to log in after registration. Please try again.");
        } else {
          router.push("/");
        }
      } else {
        setError(res.data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">Create Account</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};