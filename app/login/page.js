"use client"; // Required for client-side interactions in Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For client-side navigation
import Link from 'next/link';
import { ImSpinner3 } from "react-icons/im";

export default function Login() {
    const router = useRouter(); // Next.js router for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // To store error messages
    const [loading, setLoading] = useState(false); // Loading state

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        setLoading(true); // Start loading

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('email', data.user.email);

                // Redirect to home page
                router.push('/');
            } else {
                setError(data.error); // Display error message
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="./logo.svg" alt="logo" />
                    Pizzabyte
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border rounded bg-gray-50 dark:bg-gray-700"
                                        />
                                    </div>
                                    <label
                                        htmlFor="remember"
                                        className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-orange-600 dark:text-orange-500">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                disabled={loading} // Disable button while loading
                                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 
                                    ${loading ? 'bg-orange-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}
                                `}
                            >
                                <div className="flex justify-center items-center">
                                    {loading && <ImSpinner3 className="h-5 w-5 animate-spin mr-2" />}
                                    <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                                </div>
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <Link href="/register" className="font-medium text-orange-600 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
