import React from 'react'
import { useAuth } from '../../context/auth';
import { FaHome } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { GrDuplicate } from "react-icons/gr";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

function AdminMenu() {
    const [auth] = useAuth();
    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <img className='rounded-[100px] h-20 w-20' src="https://img.freepik.com/free-photo/woman-with-beauty-long-brown-hair-fashion-model-with-long-straight-hair-fashion-model-posing_186202-8460.jpg" alt="" />
                <h1 className='text-xl font-semibold'>{auth?.user?.name}</h1>
            </div>


            <div className='ml-5 mt-8 flex flex-col gap-2'>
                <NavLink to={'/dashboard/admin'}>
                    <div className='text-xl font-semibold flex  items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <FaHome />
                        <h1>Dashboard</h1>
                    </div>
                </NavLink>

                <NavLink to={'/dashboard/admin/products'}>
                    <div className='text-xl font-semibold flex  items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <GiLargeDress />
                        <h1>All Product</h1>
                    </div>
                </NavLink>

                <Link to={'/dashboard/admin/addproduct'}>
                    <div className='text-xl font-semibold flex  items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <GiLargeDress />
                        <h1> Add Product</h1>
                    </div>
                </Link>
                <Link to={'/dashboard/admin/addcategory'}>
                    <div className='text-xl font-semibold flex items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <GrDuplicate />
                        <h1>Add Category</h1>
                    </div>
                </Link>
                <Link to={'/dashboard/admin/allusers'}>
                    <div className='text-xl font-semibold flex items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <FaRegUser />
                        <h1>All User</h1>
                    </div>
                </Link>
                <NavLink to={'/dashboard/admin/profile'}>
                    <div className='text-xl font-semibold flex items-center gap-3 mx-1 my-1 px-3 py-3 hover:bg-black hover:text-white hover:duration-500 hover:rounded-md cursor-pointer'>
                        <RiAccountPinBoxFill />
                        <h1>Profile</h1>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminMenu