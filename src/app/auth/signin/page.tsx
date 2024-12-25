"use client";

import { signIn } from 'next-auth/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default function SignInPage() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignInSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        const result = await signIn('credentials', {
                            email: values.email,
                            password: values.password,
                            redirect: false,
                        });
                        if (result?.error) setErrors({ email: 'Invalid email or password' });
                        else if (result?.ok) router.push('/');
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label>Email</label>
                                <Field name="email" type="email" className="p-2 border rounded w-full" />
                                {errors.email && touched.email ? (
                                    <div className="text-red-500">{errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <label>Password</label>
                                <Field name="password" type="password" className="p-2 border rounded w-full" />
                                {errors.password && touched.password ? (
                                    <div className="text-red-500">{errors.password}</div>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                            <button
                                type="button"
                                onClick={() => signIn('github', { callbackUrl: '/' })}
                                className="bg-gray-800 text-white py-2 px-4 rounded w-full mt-2"
                            >
                                Sign in with GitHub
                            </button>
                            <div className="mt-4 text-center">
                                <p className="text-sm">
                                    Don't have an account?{' '}
                                    <Link href="/auth/signup" className="text-blue-500">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};