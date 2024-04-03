import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from './UserMenu'

function UserProfile() {
    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <UserMenu />
                </div>

                <div className='w-[80%] pl-6'>
                    User Profile
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile