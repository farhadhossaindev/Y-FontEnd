import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
    //context
    const [auth, setAuth] = useAuth();

    //State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth.user]);

    // from function 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put('http://localhost:8080/api/v1/auth/profile', { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
            }
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls);
            ls.user = data?.updatedUser;
            localStorage.setItem('auth', JSON.stringify(ls));
            toast.success('Profile updated successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout>
            <div className='flex'>
                <div className='w-[20%] bg-yellow-300 overflow-auto pt-5 min-h-[80vh]'>
                    <UserMenu />
                </div>

                <div className='w-[100%]'>
                    <div>
                        <div className='text-center mt-5'>User profile</div>
                        <section className='my-5'>
                            <div>
                                <div className='w-[50%] mx-auto'>
                                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-5">
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Your Full Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="email"
                                                        placeholder="Your Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="phone"
                                                        placeholder="Your Phone Number"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Your Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                                    >
                                                        Update Account
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserProfile;
