"use client";

import { signIn } from 'next-auth/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default function SignInPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignInSchema}
                    onSubmit={(values) => {
                        signIn('credentials', {
                            email: values.email,
                            password: values.password,
                            callbackUrl: '/',
                        });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4">
                            <div>
                                <label>Email</label>
                                <Field name="email" type="email" className="p-2 border rounded w-full" />
                                {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                            </div>
                            <div>
                                <label>Password</label>
                                <Field name="password" type="password" className="p-2 border rounded w-full" />
                                {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => signIn('github', { callbackUrl: '/' })}
                                className="bg-gray-800 text-white py-2 px-4 rounded w-full mt-2"
                            >
                                Sign in with GitHub
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};