import React from 'react'
import AdminMenu from './AdminMenu'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth';

function AdminProfile() {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <AdminMenu />
                </div>

                <div className='w-[80%] pl-6 flex flex-col justify-center items-start text-3xl gap-4 font-semibold'>
                    <h1>Name : {auth.user.name}</h1>
                    <h1>Email : {auth.user.email}</h1>
                    <h1>Phone : {auth.user.phone}</h1>
                    <h1>Address : {auth.user.address}</h1>
                </div>
            </div>
        </Layout>
    )
}

export default AdminProfile