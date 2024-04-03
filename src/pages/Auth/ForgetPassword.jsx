import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth';

function ForgetPassword() {

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();


    // from funtion 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/forget-password', { email, newPassword, answer });

            if (res && res.data.success) {
                toast.success(res.data && res.data.massage);

                navigate("/login");
            }
            else {
                toast.error(res.data.massage);
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing Went Wrong');
        }

    }


    return (
        <Layout title={'Forget Password'}>
            <div>
                <section className='my-5'>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                                    Forget Password
                                </h2>
                                <p className="mt-2 text-base text-gray-600">
                                    Already have an account?{" "}
                                    <Link to={'/register'}>
                                        <button className='text-black font-bold'>Sing Up</button>
                                    </Link>
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-5">




                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required

                                            />
                                        </div>

                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Your favorite Sport name"
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                required

                                            />
                                        </div>


                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required

                                            />
                                        </div>


                                        <div>
                                            <button
                                                type="submit"
                                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            >
                                                Reset{" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="ml-2"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="h-full w-full">
                            <img
                                className="mx-auto h-full w-full rounded-md object-cover"
                                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
                                alt=""
                            />
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    )
}

export default ForgetPassword